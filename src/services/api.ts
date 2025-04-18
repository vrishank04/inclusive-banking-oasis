
// This file would contain your API service for connecting to Spring Boot

// Example Spring Boot API service
import axios from 'axios';

// Define the API base URL - adjust this to your Spring Boot server URL
const API_BASE_URL = 'http://localhost:8080/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    // This is a mock implementation - replace with actual implementation
    // when connecting to Spring Boot
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },
  logout: async () => {
    localStorage.removeItem('auth_token');
    return api.post('/auth/logout');
  },
  getCurrentUser: async () => {
    return api.get('/auth/user');
  },
};

// Account services
export const accountService = {
  getAccounts: async () => {
    return api.get('/accounts');
  },
  getAccount: async (id: string) => {
    return api.get(`/accounts/${id}`);
  },
};

// Transaction services
export const transactionService = {
  getTransactions: async () => {
    return api.get('/transactions');
  },
  getTransaction: async (id: string) => {
    return api.get(`/transactions/${id}`);
  },
};

export default api;
