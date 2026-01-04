import axios from 'axios';
import { env } from '../config/env';
import { logger } from '../app';

interface InitiatePaymentData {
  email: string;
  amount: number;
  reference: string;
}

interface PaystackResponse {
  status: boolean;
  message: string;
  data: any;
}

class PaystackService {
  private baseUrl = 'https://api.paystack.co';
  private secretKey = env.PAYSTACK_SECRET_KEY;

  private get headers() {
    return {
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };
  }

  async initiatePayment(data: InitiatePaymentData): Promise<PaystackResponse> {
    try {
      if (!data.email || !data.amount || !data.reference) {
        throw new Error('Email, amount, and reference are required');
      }

      if (data.amount < 50) {
        throw new Error('Amount must be at least KES 50');
      }

      const response = await axios.post(
        `${this.baseUrl}/transaction/initialize`,
        {
          email: data.email,
          amount: Math.round(data.amount * 100), // Convert to kobo
          reference: data.reference,
          callback_url: `${env.FRONTEND_URL}/payment/callback`,
          metadata: {
            description: 'Portfolio Donation/Tip',
            timestamp: new Date().toISOString(),
          },
        },
        { headers: this.headers, timeout: 10000 }
      );

      logger.info('Paystack payment initiated', { reference: data.reference, amount: data.amount });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to initiate payment';
      logger.error('Failed to initiate Paystack payment', { error: errorMessage, reference: data.reference });
      throw new Error(errorMessage);
    }
  }

  async verifyPayment(reference: string): Promise<PaystackResponse> {
    try {
      if (!reference) {
        throw new Error('Reference is required');
      }

      const response = await axios.get(
        `${this.baseUrl}/transaction/verify/${reference}`,
        { headers: this.headers, timeout: 10000 }
      );

      logger.info('Paystack payment verified', { reference, status: response.data.data?.status });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to verify payment';
      logger.error('Failed to verify Paystack payment', { error: errorMessage, reference });
      throw new Error(errorMessage);
    }
  }

  async getBanks(): Promise<PaystackResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/bank`,
        { headers: this.headers, timeout: 10000 }
      );

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch banks';
      logger.error('Failed to fetch banks', { error: errorMessage });
      throw new Error(errorMessage);
    }
  }

  async getTransactionDetails(reference: string): Promise<PaystackResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/transaction/${reference}`,
        { headers: this.headers, timeout: 10000 }
      );

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch transaction';
      logger.error('Failed to fetch transaction details', { error: errorMessage, reference });
      throw new Error(errorMessage);
    }
  }
}

export const paystackService = new PaystackService();
export const initiatePaystackPayment = (data: InitiatePaymentData) => paystackService.initiatePayment(data);
export const verifyPaystackPayment = (reference: string) => paystackService.verifyPayment(reference);
export const getTransactionDetails = (reference: string) => paystackService.getTransactionDetails(reference);

export const createDirectPaystackCharge = async (data: {
  email: string;
  amount: number;
  reference: string;
  authorization_code?: string;
  mobile_money?: {
    phone: string;
    provider: 'mpesa';
  };
}) => {
  if (!data.email || !data.amount || !data.reference) {
    throw new Error('Email, amount, and reference are required');
  }

  const payload: any = {
    email: data.email,
    amount: Math.round(data.amount * 100), // Convert to kobo
    reference: data.reference,
    currency: 'KES',
  };

  // For card payments with token
  if (data.authorization_code) {
    payload.authorization_code = data.authorization_code;
    payload.channel = 'card';
  }

  // For MPESA payments
  if (data.mobile_money) {
    payload.mobile_money = data.mobile_money;
    payload.channel = 'mobile_money';
  }

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/charge_authorization',
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Charge authorization failed';
    logger.error('Failed to create direct charge', { error: errorMessage, reference: data.reference });
    throw new Error(errorMessage);
  }
};
