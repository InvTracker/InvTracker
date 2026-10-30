import { apiClient } from './apiClient.js';

export const authApi = {
  login: async (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },

  register: async (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  getProfile: async (role = 'user') => {
    return apiClient.get(`/auth/profile?role=${role}`);
  }
};


