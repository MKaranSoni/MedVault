import api from './api';

export const medicalReportService = {
  getReports: async (type = '', search = '') => {
    let url = '/patient/reports';
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (search) params.append('search', search);
    if (params.toString()) url += `?${params.toString()}`;
    const response = await api.get(url);
    return response.data;
  },

  getReport: async (id) => {
    const response = await api.get(`/patient/reports/${id}`);
    return response.data;
  },

  uploadReport: async (formData) => {
    // formData must be an instance of FormData to handle file uploads correctly
    const response = await api.post('/patient/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  updateReport: async (id, data) => {
    const response = await api.put(`/patient/reports/${id}`, data);
    return response.data;
  },

  deleteReport: async (id) => {
    const response = await api.delete(`/patient/reports/${id}`);
    return response.data;
  }
};
