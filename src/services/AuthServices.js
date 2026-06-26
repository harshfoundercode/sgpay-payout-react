// src/services/authService.js
import api, { API_ENDPOINTS } from './api';

const authService = {
  async login(email, password) {
    console.log('🔐 Login attempt started');
    console.log('📧 Email:', email);
    
    try {
      const response = await api.post(API_ENDPOINTS.auth.login, { 
        email, 
        password 
      });
      
      console.log('📥 Login response:', response.data);
      
      if (response.data.token) {
        console.log('🔑 Token received');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        localStorage.setItem('isLoggedIn', 'true');
        console.log('💾 Data saved to localStorage');
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  },

  logout() {
    console.log('🚪 Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('isLoggedIn');
  },

  isAuthenticated() {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return token !== null && isLoggedIn;
  },

  getAdmin() {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

   /**
   * Step 1: Send OTP for forgot password
   * @param {string} email - User's email
   * @returns {Promise} - API response
   */
  async forgotPassword(email) {
    try {
      console.log('📡 Sending forgot password OTP for:', email);
      const response = await api.post(API_ENDPOINTS.forgetPassword.forgetPass, { email });
      console.log('✅ Forgot password OTP sent:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Forgot password error:', error);
      throw error;
    }
  },

  /**
   * Step 2: Verify OTP
   * @param {string} email - User's email
   * @param {string} otp - 6-digit OTP
   * @returns {Promise} - API response
   */
  async verifyOTP(email, otp) {
    try {
      console.log('📡 Verifying OTP for:', email);
      const response = await api.post(API_ENDPOINTS.forgetPassword.verifyOtp, { email, otp });
      console.log('✅ OTP verified:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ OTP verification error:', error);
      throw error;
    }
  },

  /**
   * Step 3: Reset password
   * @param {string} email - User's email
   * @param {string} otp - 6-digit OTP
   * @param {string} newPassword - New password
   * @returns {Promise} - API response
   */
  async resetPassword(email, otp, newPassword) {
    try {
      console.log('📡 Resetting password for:', email);
      const response = await api.post(API_ENDPOINTS.forgetPassword.resetPass, { 
        email, 
        otp, 
        new_password: newPassword 
      });
      console.log('✅ Password reset:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Password reset error:', error);
      throw error;
    }
  },

};

export default authService;