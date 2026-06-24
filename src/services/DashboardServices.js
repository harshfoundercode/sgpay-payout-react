import api, { API_ENDPOINTS } from './api';

const dashboardService = {
  // Get dashboard data
  async getDashboardData(params = {}) {
    try {
      const response = await api.get(API_ENDPOINTS.dashboard.getOverview, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },
};

export default dashboardService;