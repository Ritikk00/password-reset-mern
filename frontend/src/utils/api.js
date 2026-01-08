import axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_URL = `${BASE_URL}/api`;

// Axios instance create karein
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Token attach karne ke liye
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: Errors handle karne ke liye
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Agar token expire ho gaya ho
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- Auth Endpoints ---
export const authAPI = {
  // Register: Backend mein fields check kar lena (email, password)
  register: (email, password, confirmPassword) =>
    api.post('/auth/register', { email, password, confirmPassword }),
  
  // Login
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  
  // Forgot Password
  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),
  
  // Verify Token (Reset link click karne par)
  verifyResetToken: (token) =>
    api.post('/auth/verify-reset-token', { token }),
  
  // Reset Password (Naya password set karne ke liye)
  resetPassword: (token, newPassword, confirmPassword) =>
    api.post('/auth/reset-password', { token, password: newPassword, confirmPassword }),
  
  // Get Current User Profile
  getCurrentUser: () =>
    api.get('/auth/me'),
};

// --- Utility Functions ---

export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export default api;
