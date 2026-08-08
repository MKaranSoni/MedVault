import api from './api';

export const patientService = {
  getProfile: async () => {
    const response = await api.get('/patient/profile');
    return response.data;
  },
  
  updateProfile: async (profileData) => {
    const response = await api.put('/patient/profile', profileData);
    return response.data;
  }
};
