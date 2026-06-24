// src/services/api.js
import axios from 'axios';
import API_ENDPOINTS, { getApiUrl } from '../pages/config/ApiEndPoints';

const API_BASE_URL = 'https://root.payoutpanel.com/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.baseURL + config.url,
      fullUrl: config.baseURL + config.url,
      headers: config.headers,
      data: config.data,
      params: config.params,
      timestamp: new Date().toISOString()
    });

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token attached:', token);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data,
      timestamp: new Date().toISOString()
    });
    
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
        timestamp: new Date().toISOString()
      });

      const isLoginPage = window.location.pathname === '/login';
      
      if (error.response.status === 401 && !isLoginPage) {
        console.warn('⚠️ Token expired or invalid. Logging out...');
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/login';
      }
    } else if (error.request) {
      console.error('❌ No Response:', {
        request: error.request,
        url: error.config?.url,
        timestamp: new Date().toISOString()
      });
    }

    return Promise.reject(error);
  }
);

// Export API endpoints helper
export { API_ENDPOINTS, getApiUrl };

export default api;