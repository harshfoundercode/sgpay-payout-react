// src/services/payoutReportService.js
import api, { API_ENDPOINTS } from './api';

const payoutReportService = {
  /**
   * Get payout report data with filters
   * @param {Object} params - Query parameters
   * @param {string} params.start_date - Start date
   * @param {string} params.end_date - End date
   * @param {string} params.merchant_id - Filter by merchant
   * @param {string} params.api_id - Filter by API
   * @param {string} params.status - Filter by status
   * @returns {Promise} - API response
   */
  async getPayoutReport(params = {}) {
    try {
      console.log('📡 Fetching payout report with params:', params);
      
      const cleanParams = {};
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          cleanParams[key] = params[key];
        }
      });
      
      const response = await api.get(API_ENDPOINTS.reports.payout, { 
        params: cleanParams 
      });
      
      console.log('✅ Payout report fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching payout report:', error);
      throw error;
    }
  },

  /**
   * Export payout report
   * @param {Object} params - Filter parameters
   * @returns {Promise} - API response with blob
   */
  async exportPayoutReport(params = {}) {
    try {
      console.log('📡 Exporting payout report with params:', params);
      const response = await api.get(`${API_ENDPOINTS.reports.payout}/export`, { 
        params,
        responseType: 'blob'
      });
      console.log('✅ Payout report exported');
      return response.data;
    } catch (error) {
      console.error('❌ Error exporting payout report:', error);
      throw error;
    }
  }
};

export default payoutReportService;