import api from './api';

export const emergencyContactService = {
  getContacts: async () => {
    const response = await api.get('/patient/emergency-contacts');
    return response.data;
  },
  
  addContact: async (contactData) => {
    const response = await api.post('/patient/emergency-contacts', contactData);
    return response.data;
  },

  updateContact: async (id, contactData) => {
    const response = await api.put(`/patient/emergency-contacts/${id}`, contactData);
    return response.data;
  },

  deleteContact: async (id) => {
    const response = await api.delete(`/patient/emergency-contacts/${id}`);
    return response.data;
  },

  setPrimaryContact: async (id) => {
    const response = await api.patch(`/patient/emergency-contacts/${id}/primary`);
    return response.data;
  }
};
