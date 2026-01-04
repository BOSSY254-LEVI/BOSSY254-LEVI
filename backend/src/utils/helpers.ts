import { logger } from '../app';

/**
 * Payment Status Enum
 */
export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

/**
 * Contact Status Enum
 */
export enum ContactStatus {
  NEW = 'new',
  REVIEWED = 'reviewed',
  RESPONDED = 'responded',
}

/**
 * API Response Interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

/**
 * Format currency in KES
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(amount);
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Kenya format)
 */
export const isValidKenyanPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+254|0)[0-9]{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Generate random token
 */
export const generateToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

/**
 * Sanitize string for safe HTML output
 */
export const sanitizeHtml = (str: string): string => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Retry function with exponential backoff
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError: Error | undefined;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      logger.warn(`Attempt ${i + 1} failed, retrying...`, { error: lastError.message });
      
      if (i < maxAttempts - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, i)));
      }
    }
  }

  throw lastError || new Error('Failed after maximum attempts');
};

/**
 * Truncate string
 */
export const truncate = (str: string, length: number = 50): string => {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

/**
 * Get time ago string (e.g., "2 hours ago")
 */
export const getTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

  const units: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ];

  for (const [secondsInUnit, unit] of units) {
    const n = Math.floor(seconds / secondsInUnit);
    if (n >= 1) {
      return `${n} ${unit}${n > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

/**
 * Convert Kobo to KES (Paystack amounts are in Kobo)
 */
export const koboToKes = (kobo: number): number => {
  return kobo / 100;
};

/**
 * Convert KES to Kobo (for Paystack API)
 */
export const kesToKobo = (kes: number): number => {
  return Math.round(kes * 100);
};

/**
 * Check if value is valid amount
 */
export const isValidAmount = (amount: number, min: number = 50, max: number = 10000000): boolean => {
  return Number.isFinite(amount) && amount >= min && amount <= max;
};

/**
 * Mask email for display
 */
export const maskEmail = (email: string): string => {
  const [local, domain] = email.split('@');
  const maskedLocal = local.substring(0, 2) + '*'.repeat(Math.max(0, local.length - 2)) + local.substring(local.length - 1);
  return `${maskedLocal}@${domain}`;
};

/**
 * Validate reference format
 */
export const isValidReference = (reference: string): boolean => {
  // Expected format: PREFIX-TIMESTAMP-RANDOM
  const referenceRegex = /^[A-Z]+-\d+-[a-z0-9]+$/;
  return referenceRegex.test(reference);
};

/**
 * Get payment method from Paystack response
 */
export const getPaymentMethod = (authorizationData: any): string => {
  if (!authorizationData) return 'unknown';
  
  const channel = authorizationData.channel || 'unknown';
  const cardType = authorizationData.card_type || '';
  
  if (channel === 'card') {
    return `Card - ${cardType}`.toUpperCase();
  } else if (channel === 'mobile_money') {
    return 'Mobile Money';
  } else if (channel === 'bank') {
    return 'Bank Transfer';
  } else if (channel === 'ussd') {
    return 'USSD';
  }
  
  return channel.toUpperCase();
};

/**
 * Calculate fees for Paystack transaction
 */
export const calculatePaystackFee = (amount: number): number => {
  // Paystack charges: 1.5% + 100 naira for cards, varies for other methods
  // This is a rough estimate - check Paystack docs for exact rates
  return Math.round((amount * 0.015) + 10000); // In Kobo (0.01 * 100)
};

/**
 * Log operation
 */
export const logOperation = (
  operation: string,
  status: 'success' | 'error' | 'warning' | 'info',
  details: any
): void => {
  const statusMap: Record<string, keyof typeof logger> = {
    success: 'info',
    error: 'error',
    warning: 'warn',
    info: 'info',
  };
  
  const logFn = logger[statusMap[status] || 'info'] as any;
  logFn(`${operation} - ${status}`, details);
};

/**
 * Create pagination metadata
 */
export const getPaginationMetadata = (
  page: number = 1,
  limit: number = 10,
  total: number
): {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
} => {
  const pages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    pages,
    hasNext: page < pages,
    hasPrev: page > 1,
  };
};
