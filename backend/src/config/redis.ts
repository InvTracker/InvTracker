import { Redis } from 'ioredis';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

let redisClient: Redis | null = null;
let isRedisAvailable = false;

export function initializeRedis(): Redis | null {
  if (!env.REDIS_URL) {
    logger.info('REDIS_URL not configured. Running with in-memory concurrency locks and rate limiter.');
    return null;
  }

  try {
    redisClient = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        if (times > 5) {
          logger.warn('Redis reconnection exceeded max attempts. Falling back to in-memory guards.');
          return null;
        }
        return Math.min(times * 100, 2000);
      },
      enableOfflineQueue: false
    });

    redisClient.on('connect', () => {
      isRedisAvailable = true;
      logger.info('Redis connection established successfully');
    });

    redisClient.on('error', (err) => {
      isRedisAvailable = false;
      logger.warn({ err: err.message }, 'Redis connection error. In-memory fallback is active.');
    });

    redisClient.on('close', () => {
      isRedisAvailable = false;
      logger.warn('Redis connection closed');
    });

    return redisClient;
  } catch (error) {
    logger.error({ error }, 'Failed to initialize Redis client');
    return null;
  }
}

export function getRedisClient(): Redis | null {
  return isRedisAvailable ? redisClient : null;
}

export function isRedisConnected(): boolean {
  return isRedisAvailable;
}

export async function closeRedis(): Promise<void> {
  if (redisClient) {
    try {
      await redisClient.quit();
      logger.info('Redis connection closed gracefully');
    } catch (err) {
      logger.warn({ err }, 'Error closing Redis connection');
    }
  }
}

