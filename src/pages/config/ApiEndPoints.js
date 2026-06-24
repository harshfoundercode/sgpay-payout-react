// src/config/apiEndpoints.js
const API_BASE_URL = 'https://root.payoutpanel.com/api/';

const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: 'admin/login'
  },
  
  // Dashboard endpoints
  dashboard: {
    getOverview: 'dashboard',
  },

  changePass:"admin/change-password",

   merchants: {
    list: 'admin/merchants',
    details:'admin/merchants/',
    create:'admin/merchants',
    update:'admin/merchants',

  },
   payoutApis: {
    list: 'api-providers',
    create: 'api-providers/create',
    update: 'api-providers/update',
    delete: 'api-providers/delete',
    details: 'api-providers/details',
    toggleStatus: '/api-providers/toggle-status',
  },
  
  transactions: {
    list: 'payout-transactions',
    details: 'transactions/details',
    export: 'transactions/export',
    filter: 'transactions/filter',
    retry: 'transactions/retry',
    return: 'transactions/return',
  },
      
};

// Helper function to get full URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Helper function to get endpoint with params
export const getApiUrlWithParams = (endpoint, params = {}) => {
  const url = getApiUrl(endpoint);
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `${url}?${queryString}` : url;
};

export default API_ENDPOINTS;