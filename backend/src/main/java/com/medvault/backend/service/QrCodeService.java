package com.medvault.backend.service;

import com.medvault.backend.dto.request.qr.QrCodeDto;
import com.medvault.backend.dto.response.qr.EmergencyProfileDto;

public interface QrCodeService {
    QrCodeDto generateOrGetQr(String email, String frontendBaseUrl);
    QrCodeDto regenerateQr(String email, String frontendBaseUrl);
    void revokeQr(String email);
    QrCodeDto getQrStatus(String email, String frontendBaseUrl);
    EmergencyProfileDto getEmergencyProfileByToken(String token);
}
