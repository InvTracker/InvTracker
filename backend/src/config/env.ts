import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .default('5000')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val < 65536, { message: 'PORT must be between 1 and 65535' }),
  CORS_ORIGINS: z
    .string()
    .default('https://invtracker-henna.vercel.app,http://localhost:5173,http://localhost:3000,http://localhost:5000')
    .transform((val) => val.split(',').map((origin) => origin.trim()).filter(Boolean)),
  FIREBASE_PROJECT_ID: z.string().default('invtracker-9a207'),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),
  FIREBASE_SERVICE_ACCOUNT_PATH: z.string().optional(),
  ADMIN_EMAILS: z
    .string()
    .default('admin@example.com,admin@campus.edu')
    .transform((val) => val.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)),
  KITCHEN_EMAILS: z
    .string()
    .default('kitchen@example.com,kitchen@campus.edu')
    .transform((val) => val.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)),
  REDIS_URL: z.string().optional(),
  RATE_LIMIT_WINDOW_MS: z
    .string()
    .default('900000')
    .transform((val) => parseInt(val, 10)),
  RATE_LIMIT_MAX: z
    .string()
    .default('100')
    .transform((val) => parseInt(val, 10)),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info')
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('FATAL: Environment validation failed:');
  console.error(JSON.stringify(parsedEnv.error.format(), null, 2));
  process.exit(1);
}

export const env = parsedEnv.data;
export type EnvConfig = typeof env;

