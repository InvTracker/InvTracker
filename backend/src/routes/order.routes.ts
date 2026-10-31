import { Router } from 'express';
import { authenticateUser, requireRole } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { idempotencyMiddleware } from '../middlewares/idempotency.middleware.js';
import { orderCreationLimiter } from '../middlewares/rateLimiter.middleware.js';
import {
  placeOrderSchema,
  updateOrderStatusSchema,
  orderIdParamSchema,
  getOrdersQuerySchema
} from '../schemas/order.schema.js';
import { getOrders, placeOrder, updateOrderStatus } from '../controllers/order.controller.js';

const router = Router();

router.get(
  '/',
  authenticateUser,
  validateRequest({ query: getOrdersQuerySchema }),
  getOrders
);

router.post(
  '/',
  authenticateUser,
  orderCreationLimiter,
  idempotencyMiddleware,
  validateRequest({ body: placeOrderSchema }),
  placeOrder
);

router.patch(
  '/:id/status',
  authenticateUser,
  requireRole('kitchen', 'admin'),
  validateRequest({ params: orderIdParamSchema, body: updateOrderStatusSchema }),
  updateOrderStatus
);

export default router;
