// src/services/payoutSettingsService.js
import api from './api';

const payoutSettingsService = {
  /**
   * Get current payout status
   * @returns {Promise} - API response { status: "active" | "stopped" }
   */
  async getPayoutStatus() {
    try {
      console.log('📡 Fetching payout status...');
      const response = await api.get('/settings/payout-status');
      console.log('✅ Payout status fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching payout status:', error);
      throw error;
    }
  },

  /**
   * Update payout status
   * @param {string} status - "active" or "stopped"
   * @returns {Promise} - API response
   */
  async updatePayoutStatus(status) {
    try {
      console.log('📡 Updating payout status to:', status);
      const response = await api.patch('/settings/payout-status', { status });
      console.log('✅ Payout status updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating payout status:', error);
      throw error;
    }
  },

  /**
   * Toggle payout status
   * @param {string} currentStatus - Current status ("active" or "stopped")
   * @returns {Promise} - API response with new status
   */
  async togglePayoutStatus(currentStatus) {
    const newStatus = currentStatus === 'active' ? 'stopped' : 'active';
    return this.updatePayoutStatus(newStatus);
  }
};

export default payoutSettingsService;