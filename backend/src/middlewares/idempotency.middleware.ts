import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth.js';
import { getRedisClient } from '../config/redis.js';
import { logger } from '../utils/logger.js';
import { ConflictError } from '../utils/errors.js';

interface CachedResponse {
  status: number;
  body: unknown;
  timestamp: string;
}

const memoryIdempotencyCache = new Map<string, CachedResponse | 'processing'>();

export function idempotencyMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const headerKey = req.headers['idempotency-key'] || req.headers['x-idempotency-key'];
  const bodyKey = req.body && typeof req.body === 'object' ? req.body.idempotencyKey || req.body.clientOrderToken : undefined;
  const key = (typeof headerKey === 'string' ? headerKey : typeof bodyKey === 'string' ? bodyKey : undefined)?.trim();

  if (!key) {
    return next();
  }

  req.idempotencyKey = key;
  const redis = getRedisClient();
  const redisKey = `idempotency:${key}`;

  const checkAndStore = async () => {
    try {
      if (redis) {
        const existing = await redis.get(redisKey);
        if (existing) {
          if (existing === 'processing') {
            throw new ConflictError('A request with this idempotency key is currently being processed. Please wait.');
          }
          const parsed = JSON.parse(existing) as CachedResponse;
          logger.info({ key, status: parsed.status }, 'Returning cached idempotent response from Redis');
          res.setHeader('X-Cache-Lookup', 'HIT');
          res.status(parsed.status).json(parsed.body);
          return;
        }

        await redis.set(redisKey, 'processing', 'EX', 60);
      } else {
        const memExisting = memoryIdempotencyCache.get(key);
        if (memExisting) {
          if (memExisting === 'processing') {
            throw new ConflictError('A request with this idempotency key is currently being processed. Please wait.');
          }
          logger.info({ key, status: memExisting.status }, 'Returning cached idempotent response from Memory');
          res.setHeader('X-Cache-Lookup', 'HIT');
          res.status(memExisting.status).json(memExisting.body);
          return;
        }

        memoryIdempotencyCache.set(key, 'processing');
        setTimeout(() => {
          if (memoryIdempotencyCache.get(key) === 'processing') {
            memoryIdempotencyCache.delete(key);
          }
        }, 60000);
      }

      const originalJson = res.json.bind(res);
      res.json = function (body: unknown): Response {
        const cachedPayload: CachedResponse = {
          status: res.statusCode,
          body,
          timestamp: new Date().toISOString()
        };

        if (redis) {
          redis.set(redisKey, JSON.stringify(cachedPayload), 'EX', 86400).catch((err) => {
            logger.warn({ err, key }, 'Failed to persist idempotent response in Redis');
          });
        } else {
          memoryIdempotencyCache.set(key, cachedPayload);
          setTimeout(() => memoryIdempotencyCache.delete(key), 86400000);
        }

        return originalJson(body);
      };

      next();
    } catch (err) {
      next(err);
    }
  };

  checkAndStore();
}

