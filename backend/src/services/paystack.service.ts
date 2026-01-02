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
      const response = await axios.post(
        `${this.baseUrl}/transaction/initialize`,
        {
          email: data.email,
          amount: data.amount,
          reference: data.reference,
          callback_url: `${env.FRONTEND_URL}/payment/callback`,
        },
        { headers: this.headers }
      );

      logger.info('Paystack payment initiated', { reference: data.reference });
      return response.data;
    } catch (error: any) {
      logger.error('Failed to initiate Paystack payment', { error: error.response?.data });
      throw new Error('Failed to initiate payment');
    }
  }

  async verifyPayment(reference: string): Promise<PaystackResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/transaction/verify/${reference}`,
        { headers: this.headers }
      );

      logger.info('Paystack payment verified', { reference, status: response.data.data.status });
      return response.data;
    } catch (error: any) {
      logger.error('Failed to verify Paystack payment', { error: error.response?.data });
      throw new Error('Failed to verify payment');
    }
  }

  async getBanks(): Promise<PaystackResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/bank`,
        { headers: this.headers }
      );

      return response.data;
    } catch (error: any) {
      logger.error('Failed to fetch banks', { error: error.response?.data });
      throw new Error('Failed to fetch banks');
    }
  }
}

export const paystackService = new PaystackService();
export const initiatePaystackPayment = (data: InitiatePaymentData) => paystackService.initiatePayment(data);
export const verifyPaystackPayment = (reference: string) => paystackService.verifyPayment(reference);
