import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.string().min(1, 'Item ID is required'),
  name: z.string().min(1, 'Item name is required'),
  qty: z.number().int().positive('Quantity must be at least 1').max(50, 'Max 50 per item per order'),
  price: z.number().nonnegative('Item price must be >= 0')
});

export const placeOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Order must contain at least 1 item'),
  total: z.number().nonnegative('Order total must be non-negative'),
  customerName: z.string().trim().min(1).max(100).optional(),
  customerId: z.string().trim().optional(),
  counter: z.string().trim().default('Counter 1 (Hot Station)'),
  paymentMethod: z.enum(['Campus UPI', 'Meal Pass', 'FastPay Token', 'Cash / Counter']).default('Campus UPI'),
  idempotencyKey: z.string().trim().max(128).optional()
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['Placed', 'Preparing', 'Ready', 'Picked up'], {
    errorMap: () => ({ message: 'Status must be one of: Placed, Preparing, Ready, Picked up' })
  })
});

export const orderIdParamSchema = z.object({
  id: z.string().min(1, 'Order ID is required')
});

export const getOrdersQuerySchema = z.object({
  status: z.enum(['All', 'Placed', 'Preparing', 'Ready', 'Picked up']).optional(),
  counter: z.string().trim().optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 50))
});
