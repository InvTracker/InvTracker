import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { requestIdMiddleware } from './middlewares/requestId.middleware.js';
import { generalLimiter } from './middlewares/rateLimiter.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { getHealth } from './controllers/health.controller.js';
import apiRouter from './routes/index.js';
import { NotFoundError } from './utils/errors.js';

export function createApp(): Express {
  const app = express();

  // 1. Security HTTP Headers
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false
    })
  );

  // 2. Strict CORS with origin whitelisting
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || env.CORS_ORIGINS.includes(origin) || env.NODE_ENV !== 'production') {
          callback(null, true);
        } else {
          callback(new Error(`Origin "${origin}" is not allowed by CORS configuration.`));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key', 'X-Request-Id']
    })
  );

  // 3. Body parsers with payload byte protection
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // 4. Request tracing and traffic rate limiting
  app.use(requestIdMiddleware);
  app.use(generalLimiter);

  // 5. Root health check endpoints
  app.get('/health', getHealth);
  app.get('/api/health', getHealth);

  // 6. Mount API routers
  app.use('/api', apiRouter);

  // 7. Unmatched route 404 handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}. Route does not exist.`));
  });

  // 8. Global Error Handler
  app.use(errorHandler);

  return app;
}

