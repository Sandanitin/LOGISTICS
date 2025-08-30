import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any global request headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle any global response errors here
    return Promise.reject(error);
  }
);

const adminApi = {
  // Products
  products: {
    getAll: () => api.get('/api/products'),
    getById: (id) => api.get(`/api/products/${id}`),
    create: (formData) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      return api.post('/api/products', formData, config);
    },
    update: (id, formData) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      return api.put(`/api/products/${id}`, formData, config);
    },
    delete: (id) => api.delete(`/api/products/${id}`),
  },

  // Orders
  orders: {
    getAll: () => api.get('/api/orders'),
    getById: (id) => api.get(`/api/orders/${id}`),
    updateStatus: (id, status) => api.patch(`/api/orders/${id}/status`, { status }),
  },

  // Subscriptions
  subscriptions: {
    getAll: () => api.get('/api/subscriptions'),
    getById: (id) => api.get(`/api/subscriptions/${id}`),
    updateStatus: (id, status) => api.patch(`/api/subscriptions/${id}/status`, { status }),
    cancel: (id) => api.post(`/api/subscriptions/${id}/cancel`),
    pause: (id) => api.post(`/api/subscriptions/${id}/pause`),
    resume: (id) => api.post(`/api/subscriptions/${id}/resume`),
  },
};

export default adminApi;