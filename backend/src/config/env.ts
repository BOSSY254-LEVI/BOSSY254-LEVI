
import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  
  // Supabase
  SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  SUPABASE_ANON_KEY: z.string().min(1, 'Supabase Anonymous Key is required'),
  
  // Email Configuration (Namecheap private email)
  EMAIL_HOST: z.string().min(1, 'Email host is required'),
  EMAIL_PORT: z.coerce.number().default(587),
  EMAIL_USER: z.string().email('Invalid email user'),
  EMAIL_PASS: z.string().min(1, 'Email password is required'),
  EMAIL_FROM: z.string().email('Invalid from email address'),
  
  // Paystack
  PAYSTACK_SECRET_KEY: z.string().min(1, 'Paystack Secret Key is required'),
  PAYSTACK_PUBLIC_KEY: z.string().min(1, 'Paystack Public Key is required'),
  
  // Frontend URLs
  FRONTEND_URL: z.string().url('Invalid Frontend URL').default('http://localhost:5173'),
  FRONTEND_URL_PROD: z.string().url('Invalid Production Frontend URL').default('https://livingstoneoduor.online'),
});

export const env = envSchema.parse(process.env);

// Log environment startup info
console.log(`\n🚀 Backend Starting...`);
console.log(`Environment: ${env.NODE_ENV}`);
console.log(`Port: ${env.PORT}`);
console.log(`Frontend URL: ${env.NODE_ENV === 'production' ? env.FRONTEND_URL_PROD : env.FRONTEND_URL}`);
console.log(`\n`);

