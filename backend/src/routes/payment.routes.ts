import { Router } from 'express';
import { 
  initiatePayment, 
  verifyPayment, 
  createSimplePayment,
  createDirectPayment,
  handlePaymentWebhook,
  getPaymentStatus,
  getAllPayments,
} from '../controllers/payment.controller';

const router = Router();

/**
 * POST /api/payment/initiate
 * Initiate a payment that redirects to Paystack
 */
router.post('/initiate', initiatePayment);

/**
 * POST /api/payment/simple
 * Create a simple payment record (minimal flow)
 */
router.post('/simple', createSimplePayment);

/**
 * POST /api/payment/direct
 * Direct charge on saved card/account
 */
router.post('/direct', createDirectPayment);

/**
 * GET /api/payment/verify/:reference
 * Verify payment status via Paystack
 */
router.get('/verify/:reference', verifyPayment);

/**
 * GET /api/payment/status/:reference
 * Get payment status from database
 */
router.get('/status/:reference', getPaymentStatus);

/**
 * POST /api/payment/webhook
 * Paystack webhook for payment confirmation
 */
router.post('/webhook', handlePaymentWebhook);

/**
 * GET /api/payment/all
 * Get all payments (admin endpoint - should be protected with middleware)
 */
router.get('/all', getAllPayments);

export { router as paymentRoutes };