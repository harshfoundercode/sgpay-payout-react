// src/services/merchantService.js
import api, { API_ENDPOINTS } from './api';

const merchantService = {
    /**
     * Get merchants list with pagination and filters
     * @param {Object} params - Query parameters
     * @param {number} params.page - Page number
     * @param {number} params.limit - Items per page
     * @param {string} params.search - Search term
     * @param {string} params.status - Filter by status
     * @returns {Promise} - API response
     */
    async getMerchants(params = {}) {
        try {
            console.log('📡 Fetching merchants with params:', params);

            // Clean up params - remove undefined/null values
            const cleanParams = {};
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
                    cleanParams[key] = params[key];
                }
            });

            const response = await api.get(API_ENDPOINTS.merchants.list, {
                params: cleanParams
            });

            console.log('✅ Merchants fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error fetching merchants:', error);
            throw error;
        }
    },

 
    /**
     * Create new merchant
     * @param {Object} merchantData - Merchant data
     * @returns {Promise} - API response
     */
     async createMerchant(merchantData, files = {}) {
    try {
      console.log('📡 Creating merchant:', merchantData);
      console.log('📎 Files received:', files);

      // Create FormData for multipart/form-data
      const formData = new FormData();

      // Format data for API - keep all existing parameter names exactly as they are
      const formattedData = {
        merchant_name: merchantData.merchantName,
        business_name: merchantData.businessName,
        email: merchantData.email,
        mobile: merchantData.mobile,
        password: merchantData.password,
        business_type: merchantData.businessType,
        gst_number: merchantData.gst || null,
        pan_number: merchantData.pan || null,
        website_url: merchantData.websiteUrl || null,
        business_address: merchantData.businessAddress,
        city: merchantData.city,
        state: merchantData.state,
        pincode: merchantData.pincode,
        account_holder_name: merchantData.accountHolder,
        bank_name: merchantData.bankName,
        account_number: merchantData.accountNumber,
        ifsc_code: merchantData.ifsc,
        branch_name: merchantData.branchName || null,
        webhook_url: merchantData.webhookUrl || null,
        webhook_enabled: merchantData.enableWebhook === 'yes' ? 1 : 0,
        min_payout_amount: parseFloat(merchantData.minPayout.replace(/,/g, '')) || 1,
        max_payout_amount: parseFloat(merchantData.maxPayout.replace(/,/g, '')) || 50000,
        daily_limit: parseFloat(merchantData.dailyLimit.replace(/,/g, '')) || 1000000,
        monthly_limit: parseFloat(merchantData.monthlyLimit.replace(/,/g, '')) || 10000000,
        settlement_cycle: merchantData.settlementCycle,
        auto_settlement: merchantData.autoSettlement ? 1 : 0,
        merchant_status: merchantData.merchantStatus
      };

      console.log('📤 Formatted data:', formattedData);

      // Append all fields to FormData
      Object.keys(formattedData).forEach(key => {
        if (formattedData[key] !== undefined && formattedData[key] !== null) {
          formData.append(key, String(formattedData[key]));
        }
      });

      // Append API keys if provided
      if (merchantData.apiKey) {
        formData.append('api_key', merchantData.apiKey);
      }
      if (merchantData.secretKey) {
        formData.append('secret_key', merchantData.secretKey);
      }

      // Append files - using the exact parameter names you specified
      if (files.panCard) {
        formData.append('pan_card_file', files.panCard);
        console.log('📎 PAN Card attached:', files.panCard.name);
      }
      if (files.gstCertificate) {
        formData.append('gst_certificate_file', files.gstCertificate);
        console.log('📎 GST Certificate attached:', files.gstCertificate.name);
      }
      if (files.cancelledCheque) {
        formData.append('cancelled_cheque_file', files.cancelledCheque);
        console.log('📎 Cancelled Cheque attached:', files.cancelledCheque.name);
      }
      if (files.registrationCertificate) {
        formData.append('company_registration_certificate_file', files.registrationCertificate);
        console.log('📎 Registration Certificate attached:', files.registrationCertificate.name);
      }
      if (files.ownerIdProof) {
        formData.append('owner_id_proof_file', files.ownerIdProof);
        console.log('📎 Owner ID Proof attached:', files.ownerIdProof.name);
      }

      // Log FormData contents for debugging
      console.log('📦 FormData entries:');
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(`  ${pair[0]}: ${pair[1].name} (${pair[1].size} bytes)`);
        } else {
          console.log(`  ${pair[0]}: ${pair[1]}`);
        }
      }

      const response = await api.post(API_ENDPOINTS.merchants.create, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Merchant created:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating merchant:', error);
      
      // Enhanced error handling for file uploads
      if (error.response) {
        console.error('Server response:', error.response.data);
        if (error.response.status === 413) {
          throw new Error('File size too large. Please compress your files and try again.');
        }
        if (error.response.status === 415) {
          throw new Error('Unsupported file type. Please upload PDF, JPG, or PNG files.');
        }
      }
      
      throw error;
    }
  },


    /**
     * Toggle merchant status
     * @param {string|number} id - Merchant ID
     * @returns {Promise} - API response
     */
    async toggleMerchantStatus(id) {
        try {
            console.log('📡 Toggling merchant status:', id);
            const response = await api.post(`${API_ENDPOINTS.merchants.toggleStatus}/${id}`);
            console.log('✅ Merchant status toggled:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error toggling merchant status:', error);
            throw error;
        }
    },

      /**
     * Update merchant
     * @param {string|number} id - Merchant ID
     * @param {Object} merchantData - Updated merchant data
     * @param {Object} files - File objects for uploads (optional)
     * @returns {Promise} - API response
     */
    async updateMerchant(id, merchantData, files = {}) {
        try {
            console.log('📡 Updating merchant:', id, merchantData);
            console.log('📎 Files received:', files);

            // Create FormData for multipart/form-data
            const formData = new FormData();

            // Format data for API
            const formattedData = {
                merchant_name: merchantData.merchantName,
                business_name: merchantData.businessName,
                email: merchantData.email,
                mobile: merchantData.mobile,
                password: merchantData.password || undefined,
                business_type: merchantData.businessType,
                gst_number: merchantData.gst || null,
                pan_number: merchantData.pan || null,
                website_url: merchantData.websiteUrl || null,
                business_address: merchantData.businessAddress,
                city: merchantData.city,
                state: merchantData.state,
                pincode: merchantData.pincode,
                account_holder_name: merchantData.accountHolder,
                bank_name: merchantData.bankName,
                account_number: merchantData.accountNumber,
                ifsc_code: merchantData.ifsc,
                branch_name: merchantData.branchName || null,
                webhook_url: merchantData.webhookUrl || null,
                webhook_enabled: merchantData.enableWebhook === 'yes' ? 1 : 0,
                min_payout_amount: parseFloat(merchantData.minPayout.replace(/,/g, '')) || 1,
                max_payout_amount: parseFloat(merchantData.maxPayout.replace(/,/g, '')) || 50000,
                daily_limit: parseFloat(merchantData.dailyLimit.replace(/,/g, '')) || 1000000,
                monthly_limit: parseFloat(merchantData.monthlyLimit.replace(/,/g, '')) || 10000000,
                settlement_cycle: merchantData.settlementCycle,
                auto_settlement: merchantData.autoSettlement ? 1 : 0,
                merchant_status: merchantData.merchantStatus,
                merchant_id: merchantData.merchantId // Additional param for update
            };

            console.log('📤 Formatted data:', formattedData);

            // Append all fields to FormData
            Object.keys(formattedData).forEach(key => {
                if (formattedData[key] !== undefined && formattedData[key] !== null) {
                    formData.append(key, String(formattedData[key]));
                }
            });

            // Append files if provided
            if (files.panCard) {
                formData.append('pan_card_file', files.panCard);
                console.log('📎 PAN Card attached:', files.panCard.name);
            }
            if (files.gstCertificate) {
                formData.append('gst_certificate_file', files.gstCertificate);
                console.log('📎 GST Certificate attached:', files.gstCertificate.name);
            }
            if (files.cancelledCheque) {
                formData.append('cancelled_cheque_file', files.cancelledCheque);
                console.log('📎 Cancelled Cheque attached:', files.cancelledCheque.name);
            }
            if (files.registrationCertificate) {
                formData.append('company_registration_certificate_file', files.registrationCertificate);
                console.log('📎 Registration Certificate attached:', files.registrationCertificate.name);
            }
            if (files.ownerIdProof) {
                formData.append('owner_id_proof_file', files.ownerIdProof);
                console.log('📎 Owner ID Proof attached:', files.ownerIdProof.name);
            }

            const response = await api.put(`${API_ENDPOINTS.merchants.update}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('✅ Merchant updated:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error updating merchant:', error);
            throw error;
        }
    },

    /**
     * Get merchant details by ID
     */
    async getMerchantDetails(id) {
        try {
            console.log('📡 Fetching merchant details for ID:', id);
            const response = await api.get(`${API_ENDPOINTS.merchants.details}/${id}`);
            console.log('✅ Merchant details fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error fetching merchant details:', error);
            throw error;
        }
    },
};

export default merchantService;