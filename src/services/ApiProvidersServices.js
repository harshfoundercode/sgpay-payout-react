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
   * Get API provider details by ID
   * @param {string|number} id - API Provider ID
   * @returns {Promise} - API response
   */
  async getApiProviderDetails(id) {
    try {
      console.log('📡 Fetching API provider details for ID:', id);
      const response = await api.get(`${API_ENDPOINTS.payoutApis.details}/${id}`);
      console.log('✅ API provider details fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching API provider details:', error);
      throw error;
    }
  },

  /**
   * Create new API provider
   * @param {Object} providerData - API provider data
   * @returns {Promise} - API response
   */
  async createApiProvider(providerData) {
    try {
      console.log('📡 Creating API provider:', providerData);
      const response = await api.post(API_ENDPOINTS.payoutApis.create, providerData);
      console.log('✅ API provider created:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating API provider:', error);
      throw error;
    }
  },

  /**
   * Update API provider
   * @param {string|number} id - API Provider ID
   * @param {Object} providerData - Updated provider data
   * @returns {Promise} - API response
   */
  async updateApiProvider(id, providerData) {
    try {
      console.log('📡 Updating API provider:', id, providerData);
      const response = await api.put(`${API_ENDPOINTS.payoutApis.update}/${id}`, providerData);
      console.log('✅ API provider updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating API provider:', error);
      throw error;
    }
  },

  /**
   * Delete API provider
   * @param {string|number} id - API Provider ID
   * @returns {Promise} - API response
   */
  async deleteApiProvider(id) {
    try {
      console.log('📡 Deleting API provider:', id);
      const response = await api.delete(`${API_ENDPOINTS.payoutApis.delete}/${id}`);
      console.log('✅ API provider deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error deleting API provider:', error);
      throw error;
    }
  },

  /**
   * Toggle API provider status
   * @param {string|number} id - API Provider ID
   * @returns {Promise} - API response
   */
  async toggleApiProviderStatus(id) {
    try {
      console.log('📡 Toggling API provider status:', id);
      const response = await api.post(`${API_ENDPOINTS.payoutApis.toggleStatus}/${id}`);
      console.log('✅ API provider status toggled:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error toggling API provider status:', error);
      throw error;
    }
  }
};

export default apiProviderService;