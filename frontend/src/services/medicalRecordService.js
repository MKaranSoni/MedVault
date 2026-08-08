import api from './api';

export const medicalRecordService = {
  // Allergies
  getAllergies: async () => (await api.get('/patient/medical-records/allergies')).data,
  addAllergy: async (data) => (await api.post('/patient/medical-records/allergies', data)).data,
  deleteAllergy: async (id) => (await api.delete(`/patient/medical-records/allergies/${id}`)).data,

  // Diseases
  getDiseases: async () => (await api.get('/patient/medical-records/diseases')).data,
  addDisease: async (data) => (await api.post('/patient/medical-records/diseases', data)).data,
  deleteDisease: async (id) => (await api.delete(`/patient/medical-records/diseases/${id}`)).data,

  // Medications
  getMedications: async () => (await api.get('/patient/medical-records/medications')).data,
  addMedication: async (data) => (await api.post('/patient/medical-records/medications', data)).data,
  deleteMedication: async (id) => (await api.delete(`/patient/medical-records/medications/${id}`)).data,

  // Surgeries
  getSurgeries: async () => (await api.get('/patient/medical-records/surgeries')).data,
  addSurgery: async (data) => (await api.post('/patient/medical-records/surgeries', data)).data,
  deleteSurgery: async (id) => (await api.delete(`/patient/medical-records/surgeries/${id}`)).data,

  // Immunizations
  getImmunizations: async () => (await api.get('/patient/medical-records/immunizations')).data,
  addImmunization: async (data) => (await api.post('/patient/medical-records/immunizations', data)).data,
  deleteImmunization: async (id) => (await api.delete(`/patient/medical-records/immunizations/${id}`)).data,

  // Family Histories
  getFamilyHistories: async () => (await api.get('/patient/medical-records/family-histories')).data,
  addFamilyHistory: async (data) => (await api.post('/patient/medical-records/family-histories', data)).data,
  deleteFamilyHistory: async (id) => (await api.delete(`/patient/medical-records/family-histories/${id}`)).data,
};
