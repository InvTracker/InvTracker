import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  price: z.number().positive('Price must be greater than 0'),
  stock: z.number().int().nonnegative('Stock cannot be negative').default(10),
  cat: z.string().trim().min(2, 'Category is required').default('Meals'),
  counter: z.string().trim().min(2, 'Counter station is required').default('Counter 1 (Hot Station)'),
  threshold: z.number().int().nonnegative('Threshold cannot be negative').default(5),
  prepTime: z.string().trim().default('8 min'),
  tags: z.array(z.string().trim()).optional()
});

export const adjustStockSchema = z.object({
  delta: z.number().int().refine((val) => val !== 0, { message: 'Stock delta cannot be 0' })
});

export const itemIdParamSchema = z.object({
  id: z.string().min(1, 'Item ID is required')
});

export const getItemsQuerySchema = z.object({
  cat: z.string().trim().optional(),
  search: z.string().trim().max(100).optional()
});

