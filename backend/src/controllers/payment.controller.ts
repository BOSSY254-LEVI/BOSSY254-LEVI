import { Request, Response } from 'express';
import { z } from 'zod';
import crypto from 'crypto';
import { supabaseService } from '../services/supabase.service';
import { sendPaymentSuccessNotification } from '../services/email.service';
import { 
  initiatePaystackPayment, 
  verifyPaystackPayment,
  createDirectPaystackCharge
} from '../services/paystack.service';
import { logger } from '../app';

// Schema for payment validation
const paymentSchema = z.object({
  email: z.string().email('Valid email is required').toLowerCase(),
  amount: z.number().min(50, 'Minimum amount is KES 50').max(10000000, 'Maximum amount is KES 10,000,000'),
});

const simplePaymentSchema = z.object({
  email: z.string().email('Valid email is required').toLowerCase(),
  amount: z.number().min(50, 'Minimum amount is KES 50').max(10000000, 'Maximum amount is KES 10,000,000'),
});

// Generate unique reference
const generateReference = (prefix: string = 'PSK'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Initiate a payment - creates a payment record and initializes Paystack payment
 */
export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const parsed = paymentSchema.safeParse(req.body);
    
    if (!parsed.success) {
      logger.warn('Payment validation failed', { errors: parsed.error.errors });
      return res.status(400).json({
        success: false,
        message: 'Invalid input',
        errors: parsed.error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    const { email, amount } = parsed.data;
    const reference = generateReference('PSK');

    // Create payment record in Supabase
    const payment = await supabaseService.createPayment({
      email,
      amount,
      reference,
    });

    logger.info('Payment record created', { reference, email, amount });

    // Initialize Paystack payment
    const paystackResponse = await initiatePaystackPayment({
      email,
      amount,
      reference,
    });

    if (!paystackResponse.status) {
      logger.error('Paystack initialization failed', { reference, response: paystackResponse });
      return res.status(400).json({
        success: false,
        message: paystackResponse.message || 'Failed to initialize payment',
      });
    }

    logger.info('Payment initiated successfully', { reference, authorizationUrl: paystackResponse.data.authorization_url });

    res.json({
      success: true,
      message: 'Payment initialized successfully',
      data: {
        reference,
        amount,
        email,
        paymentId: payment.id,
        authorizationUrl: paystackResponse.data.authorization_url,
        accessCode: paystackResponse.data.access_code,
      },
    });

  } catch (error: any) {
    logger.error('Initiate payment error', { error: error.message });
    res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Create a simple/direct payment - minimal flow
 */
export const createSimplePayment = async (req: Request, res: Response) => {
  try {
    const parsed = simplePaymentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Email and amount are required',
        errors: parsed.error.errors,
      });
    }

    const { email, amount } = parsed.data;
    const reference = generateReference('DIRECT');

    // Create payment record in Supabase
    const payment = await supabaseService.createPayment({
      email,
      amount,
      reference,
    });

    logger.info('Simple payment created', { reference, email, amount });

    // Return success with reference for frontend to use
    res.json({
      success: true,
      message: 'Payment ready for checkout',
      data: {
        reference,
        amount,
        email,
        paymentId: payment.id,
      },
    });

  } catch (error: any) {
    logger.error('Simple payment error', { error: error.message });
    res.status(500).json({
      success: false,
      message: 'Failed to create payment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Create a direct payment charge (for recurring or saved cards)
 */
export const createDirectPayment = async (req: Request, res: Response) => {
  try {
    const { email, amount, authorizationCode } = req.body;

    if (!email || !amount || !authorizationCode) {
      return res.status(400).json({
        success: false,
        message: 'Email, amount, and authorization code are required',
      });
    }

    const reference = generateReference('CHRG');

    // Create payment record
    const payment = await supabaseService.createPayment({
      email,
      amount,
      reference,
    });

    // Create charge on Paystack
    const chargeResponse = await createDirectPaystackCharge({
      email,
      amount,
      reference,
      authorization_code: authorizationCode,
    });

    if (!chargeResponse.status) {
      // Update payment as failed
      await supabaseService.updatePaymentStatusByReference(
        reference,
        'failed',
        chargeResponse.message || 'Charge failed'
      );

      logger.error('Direct charge failed', { reference, response: chargeResponse });
      return res.status(400).json({
        success: false,
        message: chargeResponse.message || 'Charge failed',
      });
    }

    // Update payment as successful
    await supabaseService.updatePaymentStatusByReference(
      reference,
      'success',
      'Direct charge completed'
    );

    // Send success email
    try {
      await sendPaymentSuccessNotification(email, amount, reference);
    } catch (emailError) {
      logger.error('Failed to send payment success email', { error: emailError });
    }

    logger.info('Direct payment successful', { reference, amount });

    res.json({
      success: true,
      message: 'Payment completed successfully',
      data: {
        reference,
        amount,
        email,
        status: 'success',
      },
    });

  } catch (error: any) {
    logger.error('Direct payment error', { error: error.message });
    res.status(500).json({
      success: false,
      message: 'Failed to process payment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Verify payment status via Paystack
 */
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { reference } = req.params;

    if (!reference) {
      return res.status(400).json({ 
        success: false, 
        message: 'Reference is required' 
      });
    }

    // Get payment from database
    let dbPayment;
    try {
      dbPayment = await supabaseService.getPaymentByReference(reference);
    } catch (error) {
      logger.warn('Payment not found in database', { reference });
    }

    // Verify with Paystack
    const paystackResponse = await verifyPaystackPayment(reference);

    if (!paystackResponse.status) {
      logger.warn('Paystack verification returned status: false', { reference });
      return res.status(400).json({
        success: false,
        message: 'Payment verification returned false status',
        data: paystackResponse.data,
      });
    }

    const paystackStatus = paystackResponse.data.status;

    if (paystackStatus === 'success') {
      // Update payment in database if it exists
      if (dbPayment) {
        await supabaseService.updatePaymentStatusByReference(
          reference, 
          'success', 
          'Payment verified successfully via Paystack'
        );
      }

      // Send success email
      try {
        if (dbPayment) {
          await sendPaymentSuccessNotification(
            dbPayment.email, 
            dbPayment.amount, 
            reference
          );
        }
      } catch (emailError) {
        logger.error('Failed to send payment success email', { error: emailError });
      }

      logger.info('Payment verified successfully', { reference, amount: dbPayment?.amount });

      return res.json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          reference,
          status: 'success',
          amount: dbPayment?.amount,
          email: dbPayment?.email,
          paystackData: paystackResponse.data,
        },
      });
    } else {
      // Update payment in database as failed
      if (dbPayment) {
        await supabaseService.updatePaymentStatusByReference(
          reference, 
          'failed', 
          `Paystack status: ${paystackStatus}`
        );
      }

      logger.info('Payment verification failed', { reference, paystackStatus });

      return res.status(400).json({
        success: false, 
        message: `Payment verification failed. Status: ${paystackStatus}`,
        data: {
          reference,
          status: paystackStatus,
          paystackData: paystackResponse.data,
        },
      });
    }

  } catch (error: any) {
    logger.error('Verify payment error', { error: error.message });
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Webhook handler for payment completion (called by Paystack)
 */
export const handlePaymentWebhook = async (req: Request, res: Response) => {
  try {
    // Verify webhook signature
    const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
    if (!secret) {
      logger.error('PAYSTACK_WEBHOOK_SECRET not configured');
      return res.status(500).send('Webhook secret not configured');
    }

    const hash = crypto.createHmac('sha512', secret)
                       .update(JSON.stringify(req.body))
                       .digest('hex');
    
    if (hash !== req.headers['x-paystack-signature']) {
      logger.warn('Invalid webhook signature', { receivedHash: hash });
      return res.status(401).send('Unauthorized');
    }

    const event = req.body;
    logger.info('Webhook received', { event: event.event });
    
    if (event.event === 'charge.success') {
      const { reference, amount, customer } = event.data;
      
      if (!reference) {
        logger.warn('Webhook missing reference');
        return res.sendStatus(400);
      }

      // Update payment in Supabase
      try {
        await supabaseService.updatePaymentStatusByReference(
          reference, 
          'success', 
          'Payment completed via webhook'
        );

        logger.info('Payment updated via webhook', { reference });

        // Send thank you email
        try {
          if (customer?.email && amount) {
            await sendPaymentSuccessNotification(
              customer.email, 
              Math.round(amount / 100), // Convert back from kobo
              reference
            );
          }
        } catch (emailError) {
          logger.error('Failed to send webhook email', { error: emailError });
        }
      } catch (dbError) {
        logger.error('Failed to update payment from webhook', { error: dbError, reference });
      }
    }

    res.sendStatus(200);
  } catch (error: any) {
    logger.error('Webhook error', { error: error.message });
    res.status(500).send('Webhook processing failed');
  }
};

/**
 * Get payment status
 */
export const getPaymentStatus = async (req: Request, res: Response) => {
  try {
    const { reference } = req.params;

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: 'Reference is required',
      });
    }

    const payment = await supabaseService.getPaymentByReference(reference);

    res.json({
      success: true,
      data: {
        reference: payment.reference,
        status: payment.status,
        amount: payment.amount,
        email: payment.email,
        createdAt: payment.created_at,
        updatedAt: payment.updated_at,
      },
    });
  } catch (error: any) {
    logger.error('Get payment status error', { error: error.message });
    res.status(500).json({
      success: false,
      message: 'Failed to get payment status',
    });
  }
};

/**
 * Get all payments (admin endpoint - should be protected)
 */
export const getAllPayments = async (req: Request, res: Response) => {
  try {
    // TODO: Add authentication middleware
    const payments = await supabaseService.getAllPayments();

    res.json({
      success: true,
      data: payments,
      count: payments?.length || 0,
    });
  } catch (error: any) {
    logger.error('Get all payments error', { error: error.message });
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payments',
    });
  }
};  

