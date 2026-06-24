// src/services/changePasswordService.js
import api, { API_ENDPOINTS } from './api';

const changePasswordService = {
  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @param {string} confirmPassword - Confirm new password
   * @returns {Promise} - API response
   */
  async changePassword(currentPassword, newPassword, confirmPassword) {
    console.log('🔐 Change password request started');
    console.log('📝 Validating passwords...');

    // Validate password match
    if (newPassword !== confirmPassword) {
      throw new Error('New password and confirm password do not match');
    }

    // Validate password length
    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long');
    }

    // Validate current password is not empty
    if (!currentPassword) {
      throw new Error('Current password is required');
    }

    console.log('📡 Sending change password request...');
    
    try {
      const response = await api.post(API_ENDPOINTS.changePass, {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      });
      
      console.log('✅ Password changed successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Change password failed:', error);
      
      // Handle specific error cases
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          throw new Error(data.message || 'Invalid request. Please check your input.');
        } else if (status === 401) {
          throw new Error('Current password is incorrect. Please try again.');
        } else if (status === 403) {
          throw new Error('You do not have permission to change password.');
        } else if (status === 422) {
          // Validation errors from backend
          if (data.errors) {
            const errorMessages = Object.values(data.errors).flat().join(', ');
            throw new Error(errorMessages);
          }
          throw new Error(data.message || 'Validation failed. Please check your input.');
        }
      }
      
      throw error;
    }
  },

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} - Validation result
   */
  validatePasswordStrength(password) {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  },

  /**
   * Get password strength percentage
   * @param {Object} strength - Password strength object
   * @returns {number} - Strength percentage
   */
  getStrengthPercentage(strength) {
    const checks = Object.values(strength);
    const trueCount = checks.filter(v => v === true).length;
    return (trueCount / 5) * 100;
  },

  /**
   * Get password strength color
   * @param {number} percentage - Strength percentage
   * @returns {string} - CSS color class
   */
  getStrengthColor(percentage) {
    if (percentage <= 20) return "bg-red-500";
    if (percentage <= 40) return "bg-orange-500";
    if (percentage <= 60) return "bg-yellow-500";
    if (percentage <= 80) return "bg-blue-500";
    return "bg-green-500";
  },

  /**
   * Get password strength text
   * @param {number} percentage - Strength percentage
   * @returns {string} - Strength text
   */
  getStrengthText(percentage) {
    if (percentage <= 20) return "Very Weak";
    if (percentage <= 40) return "Weak";
    if (percentage <= 60) return "Fair";
    if (percentage <= 80) return "Good";
    return "Strong";
  }
};

export default changePasswordService;