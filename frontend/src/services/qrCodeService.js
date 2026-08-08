import api from './api';

export const qrCodeService = {
  getQrStatus: async () => {
    const response = await api.get('/patient/qr');
    return response.data;
  },
  generateQr: async () => {
    const response = await api.post('/patient/qr/generate');
    return response.data;
  },
  regenerateQr: async () => {
    const response = await api.post('/patient/qr/regenerate');
    return response.data;
  },
  revokeQr: async () => {
    const response = await api.post('/patient/qr/revoke');
    return response.data;
  }
};
