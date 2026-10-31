import { getRedisClient } from '../config/redis.js';
import { logger } from '../utils/logger.js';
import { ConflictError } from '../utils/errors.js';
import crypto from 'crypto';

class MemoryMutex {
  private locks = new Map<string, Promise<void>>();

  async acquire(key: string, timeoutMs: number = 5000): Promise<() => void> {
    const startTime = Date.now();
    while (this.locks.has(key)) {
      if (Date.now() - startTime > timeoutMs) {
        throw new ConflictError(`Lock acquisition timeout on key: ${key}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    let releaseLock: () => void = () => {};
    const lockPromise = new Promise<void>((resolve) => {
      releaseLock = () => {
        this.locks.delete(key);
        resolve();
      };
    });

    this.locks.set(key, lockPromise);

    setTimeout(() => {
      if (this.locks.get(key) === lockPromise) {
        this.locks.delete(key);
        releaseLock();
      }
    }, timeoutMs);

    return releaseLock;
  }
}

const memoryMutex = new MemoryMutex();

export class LockService {
  static async acquire(key: string, ttlMs: number = 5000): Promise<{ lockId: string; release: () => Promise<void> }> {
    const redis = getRedisClient();
    const lockKey = `lock:${key}`;
    const lockId = crypto.randomUUID();

    if (redis) {
      try {
        const acquired = await redis.set(lockKey, lockId, 'PX', ttlMs, 'NX');
        if (!acquired) {
          throw new ConflictError(`Concurrent transaction in progress on resource "${key}". Please retry.`);
        }

        const release = async () => {
          try {
            const luaScript = `
              if redis.call("get", KEYS[1]) == ARGV[1] then
                return redis.call("del", KEYS[1])
              else
                return 0
              end
            `;
            await redis.eval(luaScript, 1, lockKey, lockId);
          } catch (err) {
            logger.warn({ key, err }, 'Failed to release Redis lock cleanly');
          }
        };

        return { lockId, release };
      } catch (err) {
        if (err instanceof ConflictError) throw err;
        logger.warn({ key, err }, 'Redis lock failed; falling back to in-memory mutex');
      }
    }

    const releaseMem = await memoryMutex.acquire(lockKey, ttlMs);
    const release = async () => {
      releaseMem();
    };

    return { lockId, release };
  }

  static async withLock<T>(key: string, ttlMs: number, action: () => Promise<T>): Promise<T> {
    const { release } = await LockService.acquire(key, ttlMs);
    try {
      return await action();
    } finally {
      await release();
    }
  }

  static async withMultiLock<T>(keys: string[], ttlMs: number, action: () => Promise<T>): Promise<T> {
    const sortedKeys = [...new Set(keys)].sort();
    const releases: Array<() => Promise<void>> = [];

    try {
      for (const k of sortedKeys) {
        const { release } = await LockService.acquire(k, ttlMs);
        releases.push(release);
      }
      return await action();
    } finally {
      for (const release of releases.reverse()) {
        try {
          await release();
        } catch (e) {
          logger.warn({ e }, 'Error releasing lock in multi-lock release');
        }
      }
    }
  }
}

