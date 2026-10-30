/**
 * InvenTrack Unified HTTP API Client
 * Configurable base URL with fallback to local backend or mock state
 */

const API_BASE_URL = typeof window !== 'undefined' && window.INVENTRACK_API_URL 
  ? window.INVENTRACK_API_URL 
  : 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // Inject session auth token if available
  try {
    const rawUser = localStorage.getItem('invenTrack_user');
    if (rawUser) {
      const u = JSON.parse(rawUser);
      if (u.id) headers['X-User-Id'] = u.id;
      if (u.role) headers['X-User-Role'] = u.role;
    }
  } catch (e) {}

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/csv')) {
      return await response.text();
    }
    return await response.json();
  } catch (error) {
    console.warn(`[InvenTrack API Error] ${options.method || 'GET'} ${url}:`, error.message);
    throw error;
  }
}

export const apiClient = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  patch: (endpoint, body, options) => request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' })
};

