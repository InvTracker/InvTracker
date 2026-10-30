import { apiClient } from './apiClient.js';

export const auditApi = {
  getOverview: async () => {
    return apiClient.get('/audit/overview');
  },

  exportCSV: async () => {
    return apiClient.get('/audit/export-csv');
  }
};
