import { Order, OrderStatus, OrderCartItem } from '../types/order.js';
import { inventoryService } from './inventory.service.js';
import { LockService } from './lock.service.js';
import { NotFoundError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    token: 'A-042',
    customerName: 'Rohan Sharma',
    customerId: 'usr-2503',
    customerEmail: 'rohan@student.campus.edu',
    items: [{ id: 'item-dum-biryani', name: 'Chicken Dum Biryani', qty: 1, price: 180 }],
    total: 180,
    status: 'Preparing',
    placedAt: new Date(Date.now() - 8 * 60000).toISOString(),
    counter: 'Counter 1 (Hot Station)',
    paymentMethod: 'Campus UPI'
  },
  {
    id: 'ord-102',
    token: 'A-043',
    customerName: 'Priya Verma',
    customerId: 'usr-2504',
    customerEmail: 'priya@student.campus.edu',
    items: [{ id: 'item-masala-dosa', name: 'Crispy Masala Dosa', qty: 2, price: 80 }],
    total: 160,
    status: 'Placed',
    placedAt: new Date(Date.now() - 3 * 60000).toISOString(),
    counter: 'Counter 2 (Quick Bites)',
    paymentMethod: 'Meal Pass'
  }
];

class OrderService {
  private orders: Order[] = [...INITIAL_ORDERS];
  private tokenCounter = 44;

  async getAll(filter?: { status?: string; counter?: string; limit?: number }): Promise<Order[]> {
    let result = [...this.orders];

    if (filter?.status && filter.status !== 'All') {
      const statusLower = filter.status.toLowerCase();
      result = result.filter((o) => o.status.toLowerCase() === statusLower);
    }

    if (filter?.counter && filter.counter !== 'All') {
      const counterLower = filter.counter.toLowerCase();
      result = result.filter((o) => o.counter.toLowerCase() === counterLower);
    }

    if (filter?.limit) {
      result = result.slice(0, filter.limit);
    }

    return result;
  }

  async getById(id: string): Promise<Order> {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundError(`Order with ID "${id}" was not found.`);
    }
    return { ...order };
  }

  async createOrder(data: {
    items: OrderCartItem[];
    total: number;
    customerName?: string;
    customerId?: string;
    customerEmail?: string;
    counter?: string;
    paymentMethod?: string;
    idempotencyKey?: string;
  }): Promise<Order> {
    // 1. Concurrency-safe atomic stock deduction
    await inventoryService.deductMultipleAtomic(data.items);

    // 2. Generate token inside lock to guarantee sequential numbering without race duplicates
    return await LockService.withLock('order_token_sequence', 5000, async () => {
      const token = `A-${String(this.tokenCounter++).padStart(3, '0')}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        token,
        customerName: data.customerName || 'Campus Diner',
        customerId: data.customerId || 'usr-guest',
        customerEmail: data.customerEmail,
        items: data.items,
        total: data.total,
        status: 'Placed',
        placedAt: new Date().toISOString(),
        counter: data.counter || 'Counter 1 (Hot Station)',
        paymentMethod: data.paymentMethod || 'Campus UPI',
        idempotencyKey: data.idempotencyKey
      };

      this.orders.unshift(newOrder);
      logger.info({ orderId: newOrder.id, token: newOrder.token, total: newOrder.total }, 'Order created successfully');
      return { ...newOrder };
    });
  }

  async updateStatus(id: string, newStatus: OrderStatus): Promise<Order> {
    return await LockService.withLock(`order_status:${id}`, 5000, async () => {
      const order = this.orders.find((o) => o.id === id);
      if (!order) {
        throw new NotFoundError(`Order "${id}" does not exist.`);
      }

      order.status = newStatus;
      logger.info({ orderId: id, token: order.token, status: newStatus }, 'Order status advanced');
      return { ...order };
    });
  }
}

export const orderService = new OrderService();

