export type OrderStatus = 'Placed' | 'Preparing' | 'Ready' | 'Picked up';

export interface OrderCartItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  token: string;
  customerName: string;
  customerId: string;
  customerEmail?: string;
  items: OrderCartItem[];
  total: number;
  status: OrderStatus;
  placedAt: string;
  counter: string;
  paymentMethod: string;
  idempotencyKey?: string;
}
