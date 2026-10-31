import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  const requestId = (req as Request & { requestId?: string }).requestId || 'unknown';
  const isAppError = err instanceof AppError;

  const statusCode = isAppError ? err.statusCode : (err as { status?: number }).status || 500;
  const errorCode = isAppError ? err.code : 'INTERNAL_SERVER_ERROR';
  const message = isAppError || statusCode < 500 ? err.message : 'An unexpected error occurred while processing your request.';

  const logPayload = {
    requestId,
    method: req.method,
    url: req.originalUrl,
    statusCode,
    errorCode,
    errorMessage: err.message,
    stack: err.stack
  };

  if (statusCode >= 500) {
    logger.error(logPayload, 'Server Error (5xx)');
  } else {
    logger.warn(logPayload, 'Client Error (4xx)');
  }

  res.status(statusCode).json({
    success: false,
    code: errorCode,
    message,
    ...(isAppError && err.details ? { details: err.details } : {}),
    ...(env.NODE_ENV === 'development' && statusCode >= 500 ? { stack: err.stack } : {}),
    requestId,
    timestamp: new Date().toISOString()
  });
}

