// src/services/apiProviderService.js
import api, { API_ENDPOINTS } from './api';

const apiProviderService = {
  /**
   * Get API providers list with pagination and filters
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.status - Filter by status
   * @param {string} params.search - Search term
   * @returns {Promise} - API response
   */
  async getApiProviders(params = {}) {
    try {
      console.log('📡 Fetching API providers with params:', params);
      
      // Clean up params - remove undefined/null values
      const cleanParams = {};
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          cleanParams[key] = params[key];
        }
      });
      
      const response = await api.get(API_ENDPOINTS.payoutApis.list, { 
        params: cleanParams 
      });
      
      console.log('✅ API Providers fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching API providers:', error);
      throw error;
    }
  },


  /**
   * Create new API provider
   * @param {Object} providerData - API provider data
   * @param {string} providerData.name - Provider name
   * @param {number} providerData.daily_limit - Daily limit in INR
   * @param {string} providerData.port - Port number (as string)
   * @param {string} providerData.status - "active" | "inactive" | "maintenance"
   * @returns {Promise} - API response
   */
  async createApiProvider(providerData) {
    try {
      console.log('📡 Creating API provider:', providerData);
      
      // Using API_ENDPOINTS constant
      const response = await api.post(API_ENDPOINTS.payoutApis.create, providerData);
      
      console.log('✅ API provider created:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating API provider:', error);
      throw error;
    }
  },

     /**
   * Update API provider status
   * @param {string|number} id - API Provider ID
   * @param {string} status - "active" | "inactive" | "maintenance"
   * @returns {Promise} - API response
   */
  async updateApiProviderStatus(id, status) {
    try {
      console.log('📡 Updating API provider status:', id, status);
      
      // CORRECT URL PATTERN: /api/api-providers/{id}/status
      const url = `${API_ENDPOINTS.payoutApis.status}/${id}/status`;
      
      console.log('🔗 Request URL:', url);
      
      const response = await api.patch(url, { status });
      console.log('✅ API provider status updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating API provider status:', error);
      throw error;
    }
  },

  /**
   * Get single API provider details (if needed)
   */
  async getApiProvider(id) {
    try {
      console.log('📡 Fetching API provider:', id);
      const response = await api.get(`${API_ENDPOINTS.payoutApis.list}/${id}`);
      console.log('✅ API provider fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching API provider:', error);
      throw error;
    }
  }


};

export default apiProviderService;