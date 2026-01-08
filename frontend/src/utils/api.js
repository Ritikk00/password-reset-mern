import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (email, password, confirmPassword) =>
    api.post('/auth/register', { email, password, confirmPassword }),
  
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  
  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),
  
  verifyResetToken: (token) =>
    api.post('/auth/verify-reset-token', { token }),
  
  resetPassword: (token, newPassword, confirmPassword) =>
    api.post('/auth/reset-password', { token, password: newPassword, confirmPassword }),
  
  getCurrentUser: () =>
    api.get('/auth/me'),
};

// Utility to set token
export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Utility to get token
export const getToken = () => {
  return localStorage.getItem('token');
};

export default api;
