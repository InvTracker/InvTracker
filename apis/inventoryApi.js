import { apiClient } from './apiClient.js';

export const inventoryApi = {
  getItems: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.cat) params.append('cat', filters.cat);
    if (filters.search) params.append('search', filters.search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get(`/inventory/items${query}`);
  },

  adjustStock: async (itemId, delta) => {
    return apiClient.patch(`/inventory/items/${itemId}/stock`, { delta });
  },

  createItem: async (itemData) => {
    return apiClient.post('/inventory/items', itemData);
  }
};


