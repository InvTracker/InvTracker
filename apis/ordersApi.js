import { apiClient } from './apiClient.js';

export const ordersApi = {
  getOrders: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.counter) params.append('counter', filters.counter);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get(`/orders${query}`);
  },

  placeOrder: async (orderPayload) => {
    return apiClient.post('/orders/place', orderPayload);
  },

  updateStatus: async (orderId, newStatus) => {
    return apiClient.patch(`/orders/${orderId}/status`, { status: newStatus });
  }
};

