import { Router } from 'express';
import { initiatePayment, verifyPayment } from '../controllers/payment.controller';

const router = Router();

// POST /api/payment/initiate
router.post('/initiate', initiatePayment);

// GET /api/payment/verify/:reference
router.get('/verify/:reference', verifyPayment);

export { router as paymentRoutes };
