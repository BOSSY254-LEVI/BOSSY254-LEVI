import { Request, Response } from 'express';
import { z } from 'zod';
import { supabaseService } from '../services/supabase.service';
import { initiatePaystackPayment, verifyPaystackPayment } from '../services/paystack.service';
import { logger } from '../app';

const initiatePaymentSchema = z.object({
  email: z.string().email('Invalid email format'),
  amount: z.number().min(100, 'Amount must be at least 100 kobo (₦1)'),
});

export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const validatedData = initiatePaymentSchema.parse(req.body);

    // Create payment record in Supabase
    const payment = await supabaseService.createPayment({
      email: validatedData.email,
      amount: validatedData.amount,
      reference: `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    });

    // Initiate Paystack payment
    const paystackResponse = await initiatePaystackPayment({
      email: validatedData.email,
      amount: validatedData.amount,
      reference: payment.reference,
    });

    // Update payment with Paystack reference
    await supabaseService.updatePaymentStatus(payment.id, 'pending', paystackResponse.data.reference);

    res.json({
      success: true,
      message: 'Payment initiated successfully',
      data: {
        payment: {
          id: payment.id,
          reference: payment.reference,
          amount: payment.amount,
          email: payment.email,
        },
        paystack: paystackResponse.data,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors,
      });
    } else {
      logger.error('Payment initiation error', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to initiate payment',
      });
    }
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { reference } = req.params;

    // Find payment in Supabase
    const payment = await supabaseService.getPaymentByReference(reference);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    // Verify with Paystack
    const verification = await verifyPaystackPayment(reference);

    // Update payment status in Supabase
    const updatedPayment = await supabaseService.updatePaymentStatus(
      payment.id,
      verification.data.status
    );

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        payment: updatedPayment,
        paystack: verification.data,
      },
    });
  } catch (error) {
    logger.error('Payment verification error', { error });
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
    });
  }
};
