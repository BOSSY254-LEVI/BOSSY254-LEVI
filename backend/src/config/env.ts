
import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string().transform(Number),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  EMAIL_FROM: z.string(),
  PAYSTACK_SECRET_KEY: z.string(),
  PAYSTACK_PUBLIC_KEY: z.string(),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  FRONTEND_URL_PROD: z.string().default('http://www.livingstoneoduor.online'),
});

export const env = envSchema.parse(process.env);
