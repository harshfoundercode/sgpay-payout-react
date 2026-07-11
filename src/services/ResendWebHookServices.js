import api, { API_ENDPOINTS } from './api';

const resendWebHookService = {
  
  async resendWebHook(order_id) { 
    try {
      const response = await api.post(API_ENDPOINTS.transactions.resendWebHook, {
        order_id: order_id
      });
      
      console.log('✅ resend webhook successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ resend webhook failed:', error);
      throw error;
    }
  },

};

export default resendWebHookService;