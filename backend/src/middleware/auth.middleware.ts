import { Request, Response, NextFunction } from 'express';
import { logger } from '../app';

/**
 * API Key Authentication Middleware
 * Use this to protect admin endpoints
 * 
 * Usage: router.get('/admin', apiKeyAuth, adminController)
 * 
 * Add ADMIN_API_KEY to your .env file
 */
export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string;
  const validApiKey = process.env.ADMIN_API_KEY;

  if (!validApiKey) {
    logger.error('ADMIN_API_KEY not configured');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error',
    });
  }

  if (!apiKey) {
    logger.warn('API request without API key', { method: req.method, path: req.path });
    return res.status(401).json({
      success: false,
      message: 'API key required in x-api-key header',
    });
  }

  if (apiKey !== validApiKey) {
    logger.warn('Invalid API key attempt', { method: req.method, path: req.path, ip: req.ip });
    return res.status(403).json({
      success: false,
      message: 'Invalid API key',
    });
  }

  logger.info('API key validated', { method: req.method, path: req.path });
  next();
};

/**
 * Bearer Token Authentication Middleware
 * Use this for JWT-based authentication in future
 */
export const bearerTokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    logger.warn('Request without bearer token', { method: req.method, path: req.path });
    return res.status(401).json({
      success: false,
      message: 'Bearer token required in Authorization header',
    });
  }

  // TODO: Validate JWT token here
  // For now, just pass through
  
  next();
};

/**
 * Basic Authentication Middleware
 * Use this for simple username/password protection
 */
export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader?.startsWith('Basic ')) {
    logger.warn('Request without basic auth', { method: req.method, path: req.path });
    return res.status(401).json({
      success: false,
      message: 'Basic authentication required',
    });
  }

  const encodedCredentials = authHeader.replace('Basic ', '');
  const credentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validUsername || !validPassword) {
    logger.error('Admin credentials not configured');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error',
    });
  }

  if (username !== validUsername || password !== validPassword) {
    logger.warn('Invalid credentials attempt', { username, ip: req.ip });
    return res.status(403).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  logger.info('Basic auth validated', { username, method: req.method, path: req.path });
  next();
};

/**
 * Rate Limit Per User Middleware
 * Useful for limiting specific user endpoints
 */
const userLimits = new Map<string, { count: number; resetTime: number }>();

export const userRateLimit = (limit: number = 5, windowMs: number = 60000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers['x-user-id'] as string || req.ip || 'unknown';
    const now = Date.now();
    
    const userLimit = userLimits.get(userId);

    if (userLimit && userLimit.resetTime > now) {
      if (userLimit.count >= limit) {
        logger.warn('User rate limit exceeded', { userId });
        return res.status(429).json({
          success: false,
          message: 'Too many requests for this user',
        });
      }
      userLimit.count++;
    } else {
      userLimits.set(userId, {
        count: 1,
        resetTime: now + windowMs,
      });
    }

    next();
  };
};
