// src/services/transactionService.js
import api, { API_ENDPOINTS } from './api';

const transactionService = {
  /**
   * Get transactions list with pagination and filters
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.status - Filter by status
   * @param {string} params.search - Search term
   * @param {string} params.start_date - Start date
   * @param {string} params.end_date - End date
   * @param {string} params.merchant_id - Filter by merchant
   * @param {string} params.api_id - Filter by API
   * @returns {Promise} - API response
   */
  async getTransactions(params = {}) {
    try {
      console.log('📡 Fetching transactions with params:', params);
      
      const cleanParams = {};
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          cleanParams[key] = params[key];
        }
      });
      
      const response = await api.get(API_ENDPOINTS.transactions.list, { 
        params: cleanParams 
      });
      
      console.log('✅ Transactions fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching transactions:', error);
      throw error;
    }
  },

  /**
   * Get transaction details by ID
   * @param {string|number} id - Transaction ID
   * @returns {Promise} - API response
   */
  async getTransactionDetails(id) {
    try {
      console.log('📡 Fetching transaction details for ID:', id);
      const response = await api.get(`${API_ENDPOINTS.transactions.details}/${id}`);
      console.log('✅ Transaction details fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching transaction details:', error);
      throw error;
    }
  },

  /**
   * Export transactions
   * @param {Object} params - Filter parameters
   * @returns {Promise} - API response with blob
   */
  async exportTransactions(params = {}) {
    try {
      console.log('📡 Exporting transactions with params:', params);
      const response = await api.get(API_ENDPOINTS.transactions.export, { 
        params,
        responseType: 'blob'
      });
      console.log('✅ Transactions exported');
      return response.data;
    } catch (error) {
      console.error('❌ Error exporting transactions:', error);
      throw error;
    }
  },

  /**
   * Retry a failed transaction
   * @param {string|number} id - Transaction ID
   * @returns {Promise} - API response
   */
  async retryTransaction(id) {
    try {
      console.log('📡 Retrying transaction:', id);
      const response = await api.post(`${API_ENDPOINTS.transactions.retry}/${id}`);
      console.log('✅ Transaction retried:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error retrying transaction:', error);
      throw error;
    }
  },

  /**
   * Return transaction to SGPay
   * @param {string|number} id - Transaction ID
   * @returns {Promise} - API response
   */
  async returnTransaction(id) {
    try {
      console.log('📡 Returning transaction:', id);
      const response = await api.post(`${API_ENDPOINTS.transactions.return}/${id}`);
      console.log('✅ Transaction returned:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error returning transaction:', error);
      throw error;
    }
  }
};

export default transactionService;