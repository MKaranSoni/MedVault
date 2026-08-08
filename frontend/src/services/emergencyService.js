import api from './api';

export const emergencyService = {
  getEmergencyProfile: async (token) => {
    // Note: This API does not require authentication
    const response = await api.get(`/emergency/${token}`);
    return response.data;
  },
  getIceProfile: async (token) => {
    const response = await api.get(`/emergency/${token}/ice`);
    return response.data;
  },
  getEmergencyDashboard: async (token) => {
    const response = await api.get(`/emergency/${token}/dashboard`);
    return response.data;
  },
  askAi: async (token, question) => {
    const response = await api.post(`/emergency/${token}/chat`, { question });
    return response.data;
  }
};
