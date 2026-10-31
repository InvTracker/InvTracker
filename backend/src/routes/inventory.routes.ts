import { Router } from 'express';
import { authenticateUser, requireRole } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import {
  createItemSchema,
  adjustStockSchema,
  itemIdParamSchema,
  getItemsQuerySchema
} from '../schemas/inventory.schema.js';
import { getItems, adjustStock, createItem } from '../controllers/inventory.controller.js';

const router = Router();

router.get(
  '/',
  validateRequest({ query: getItemsQuerySchema }),
  getItems
);

router.patch(
  '/:id/stock',
  authenticateUser,
  requireRole('kitchen', 'admin'),
  validateRequest({ params: itemIdParamSchema, body: adjustStockSchema }),
  adjustStock
);

router.post(
  '/',
  authenticateUser,
  requireRole('admin'),
  validateRequest({ body: createItemSchema }),
  createItem
);

export default router;
