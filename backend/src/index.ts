import { Server } from 'http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { initializeFirebaseAdmin } from './config/firebase.js';
import { initializeRedis, closeRedis } from './config/redis.js';
import { logger } from './utils/logger.js';

let server: Server | null = null;
let isShuttingDown = false;

async function startServer(): Promise<void> {
  try {
    // 1. Initialize core infrastructure dependencies
    initializeFirebaseAdmin();
    initializeRedis();

    // 2. Instantiate Express application
    const app = createApp();

    // 3. Start HTTP server
    server = app.listen(env.PORT, () => {
      logger.info(
        {
          port: env.PORT,
          env: env.NODE_ENV,
          pid: process.pid
        },
        `InvenTrack API server started on http://localhost:${env.PORT}`
      );
      logger.info(`Health check live at http://localhost:${env.PORT}/health`);
    });

    server.keepAliveTimeout = 65000;
    server.headersTimeout = 66000;
  } catch (err) {
    logger.fatal({ err }, 'Fatal error during server startup');
    process.exit(1);
  }
}

async function gracefulShutdown(signal: string): Promise<void> {
  if (isShuttingDown) {
    logger.warn(`Shutdown already in progress. Ignoring duplicate signal: ${signal}`);
    return;
  }

  isShuttingDown = true;
  logger.info({ signal }, 'Initiating graceful server shutdown');

  const forceExitTimeout = setTimeout(() => {
    logger.error('Graceful shutdown timeout exceeded (10s). Forcing process termination.');
    process.exit(1);
  }, 10000);

  forceExitTimeout.unref();

  if (server) {
    server.close(async (err) => {
      if (err) {
        logger.error({ err }, 'Error closing HTTP server');
        process.exit(1);
      }

      logger.info('HTTP server closed. In-flight requests drained.');

      try {
        await closeRedis();
      } catch (redisErr) {
        logger.warn({ redisErr }, 'Error closing Redis connection during shutdown');
      }

      clearTimeout(forceExitTimeout);
      logger.info('Clean shutdown completed successfully. Exiting process.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

// Global Process Crash Prevention Guards
process.on('uncaughtException', (error: Error) => {
  logger.fatal(
    {
      error: error.message,
      stack: error.stack,
      pid: process.pid
    },
    'Uncaught Exception intercepted by process guard'
  );

  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  logger.fatal(
    {
      reason,
      promise,
      pid: process.pid
    },
    'Unhandled Promise Rejection intercepted by process guard'
  );
});

// OS Process Signal Listeners
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();
