import { dataStore } from '../models/dataStore.js';

export const getOrders = (req, res) => {
  const { status, counter } = req.query;
  let orders = dataStore.getAllOrders();

  if (status && status !== 'All') {
    orders = orders.filter(o => o.status.toLowerCase() === status.toLowerCase());
  }

  if (counter && counter !== 'All') {
    orders = orders.filter(o => o.counter.toLowerCase() === counter.toLowerCase());
  }

  return res.status(200).json({
    success: true,
    count: orders.length,
    orders
  });
};

export const placeOrder = (req, res) => {
  const { items, total, customerName, customerId, counter, paymentMethod } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
  }
  items.forEach(cartItem => {
    dataStore.updateStock(cartItem.id, -Number(cartItem.qty || 1));
  });

  const order = dataStore.createOrder({
    items,
    total: Number(total) || 0,
    customerName,
    customerId,
    counter,
    paymentMethod
  });

  return res.status(201).json({
    success: true,
    message: `Order token ${order.token} generated successfully`,
    order
  });
};

export const updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Placed', 'Preparing', 'Ready', 'Picked up'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    });
  }

  const updatedOrder = dataStore.updateOrderStatus(id, status);
  if (!updatedOrder) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  return res.status(200).json({
    success: true,
    message: `Order token ${updatedOrder.token} advanced to "${status}"`,
    order: updatedOrder
  });
};


