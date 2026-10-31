import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { env } from '../config/env.js';

export const generalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this client. Please slow down.',
      requestId: (req as Request & { requestId?: string }).requestId || 'unknown',
      timestamp: new Date().toISOString()
    });
  }
});

export const orderCreationLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      code: 'ORDER_RATE_LIMIT_EXCEEDED',
      message: 'Order creation rate limit exceeded. Please wait a moment before submitting another order.',
      requestId: (req as Request & { requestId?: string }).requestId || 'unknown',
      timestamp: new Date().toISOString()
    });
  }
});
