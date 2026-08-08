import api from './api';

export const aiService = {
  getMedicalSummary: async () => {
    const response = await api.get('/ai/summary/medical');
    return response.data;
  },

  getEmergencySummary: async () => {
    const response = await api.get('/ai/summary/emergency');
    return response.data;
  },

  explainReport: async (reportId, question = null) => {
    const payload = question ? { question } : {};
    const response = await api.post(`/ai/reports/${reportId}/explain`, payload);
    return response.data;
  },

  chat: async (question) => {
    const response = await api.post('/ai/chat', { question });
    return response.data;
  }
};
