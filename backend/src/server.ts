import { app, logger } from './app';
import { env } from './config/env';

const PORT = env.PORT;
const NODE_ENV = env.NODE_ENV;

async function startServer() {
  try {
    const server = app.listen(PORT, () => {
      logger.info(`✅ Server started successfully`);
      logger.info(`📍 Listening on port ${PORT}`);
      logger.info(`🔧 Environment: ${NODE_ENV}`);
      logger.info(`🗄️  Database: Supabase (PostgreSQL)`);
      logger.info(`💳 Payment: Paystack`);
      logger.info(`📧 Email: Namecheap Private Email`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT signal received: closing HTTP server');
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', { error: error.message, stack: error.stack });
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', { promise, reason });
    });

  } catch (error: any) {
    logger.error('Failed to start server', { error: error.message, stack: error.stack });
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer().catch((e) => {
  logger.error('Fatal error starting server', { error: e.message });
  console.error('Fatal error:', e);
  process.exit(1);
});

