import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth.js';
import { orderService } from '../services/order.service.js';
import { OrderStatus } from '../types/order.js';

export async function getOrders(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status, counter, limit } = req.query as { status?: string; counter?: string; limit?: number };
    let orders = await orderService.getAll({ status, counter, limit });

    // If user is a student, only surface their own placed orders
    if (req.user && req.user.role === 'student') {
      orders = orders.filter((o) => o.customerEmail === req.user?.email || o.customerId === req.user?.uid);
    }

    res.status(200).json({
      success: true,
      data: orders,
      meta: {
        count: orders.length,
        requestId: req.requestId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function placeOrder(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { items, total, customerName, counter, paymentMethod } = req.body;

    const customerEmail = req.user?.email || 'guest@campus.edu';
    const customerId = req.user?.uid || 'usr-guest';
    const resolvedCustomerName = customerName || req.user?.name || 'Campus Student';

    const order = await orderService.createOrder({
      items,
      total,
      customerName: resolvedCustomerName,
      customerId,
      customerEmail,
      counter,
      paymentMethod,
      idempotencyKey: req.idempotencyKey
    });

    res.status(201).json({
      success: true,
      message: `Order token ${order.token} generated successfully`,
      data: order,
      meta: {
        requestId: req.requestId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function updateOrderStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const { status } = req.body as { status: OrderStatus };

    const updated = await orderService.updateStatus(id, status);

    res.status(200).json({
      success: true,
      message: `Order token ${updated.token} status updated to "${status}"`,
      data: updated,
      meta: {
        requestId: req.requestId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
}

