import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env';

class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
  }

  // Contact operations
  async createContact(data: { name: string; email: string; message: string }) {
    const { data: contact, error } = await this.client
      .from('contacts')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return contact;
  }

  async getContacts() {
    const { data, error } = await this.client
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Payment operations
  async createPayment(data: {
    email: string;
    amount: number;
    reference: string;
    paystack_ref?: string;
  }) {
    const { data: payment, error } = await this.client
      .from('payments')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return payment;
  }

  async getPaymentByReference(reference: string) {
    const { data, error } = await this.client
      .from('payments')
      .select('*')
      .eq('reference', reference)
      .single();

    if (error) throw error;
    return data;
  }

  async updatePaymentStatus(id: string, status: string, paystackRef?: string) {
    const updateData: any = { status };
    if (paystackRef) updateData.paystack_ref = paystackRef;

    const { data, error } = await this.client
      .from('payments')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const supabaseService = new SupabaseService();
