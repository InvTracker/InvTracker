import { Request, Response } from 'express';
import { isRedisConnected } from '../config/redis.js';
import { env } from '../config/env.js';

export function getHealth(req: Request, res: Response): void {
  const memory = process.memoryUsage();
  const uptimeSeconds = Math.floor(process.uptime());

  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'InvenTrack Campus Dining & Inventory API',
    version: '2.0.0',
    environment: env.NODE_ENV,
    process: {
      pid: process.pid,
      uptime: `${uptimeSeconds}s`,
      nodeVersion: process.version,
      memory: {
        rss: `${Math.round(memory.rss / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)}MB`
      }
    },
    integrations: {
      redis: {
        connected: isRedisConnected(),
        mode: isRedisConnected() ? 'distributed-cluster' : 'in-memory-fallback'
      },
      firebase: {
        configured: true,
        projectId: env.FIREBASE_PROJECT_ID
      }
    }
  });
}

