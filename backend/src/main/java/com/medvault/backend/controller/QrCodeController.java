package com.medvault.backend.controller;

import com.medvault.backend.dto.request.qr.QrCodeDto;
import com.medvault.backend.dto.response.ApiResponse;
import com.medvault.backend.service.QrCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/patient/qr")
@RequiredArgsConstructor
public class QrCodeController {

    private final QrCodeService qrCodeService;

    // A helper to get the origin domain to embed in the QR so doctors are routed correctly to the frontend.
    private String getFrontendOrigin(HttpServletRequest request) {
        String origin = request.getHeader("Origin");
        if (origin == null) {
            origin = request.getHeader("Referer");
            if (origin != null && origin.endsWith("/")) {
                origin = origin.substring(0, origin.length() - 1);
            }
        }
        return (origin != null) ? origin : "http://localhost:5173";
    }

    @GetMapping
    public ResponseEntity<ApiResponse<QrCodeDto>> getQrStatus(Authentication authentication, HttpServletRequest request) {
        return ResponseEntity.ok(ApiResponse.<QrCodeDto>builder().success(true)
                .data(qrCodeService.getQrStatus(authentication.getName(), getFrontendOrigin(request))).build());
    }

    @PostMapping("/generate")
    public ResponseEntity<ApiResponse<QrCodeDto>> generateQr(Authentication authentication, HttpServletRequest request) {
        return ResponseEntity.ok(ApiResponse.<QrCodeDto>builder().success(true)
                .data(qrCodeService.generateOrGetQr(authentication.getName(), getFrontendOrigin(request))).build());
    }

    @PostMapping("/regenerate")
    public ResponseEntity<ApiResponse<QrCodeDto>> regenerateQr(Authentication authentication, HttpServletRequest request) {
        return ResponseEntity.ok(ApiResponse.<QrCodeDto>builder().success(true)
                .data(qrCodeService.regenerateQr(authentication.getName(), getFrontendOrigin(request))).build());
    }

    @PostMapping("/revoke")
    public ResponseEntity<ApiResponse<Void>> revokeQr(Authentication authentication) {
        qrCodeService.revokeQr(authentication.getName());
        return ResponseEntity.ok(ApiResponse.<Void>builder().success(true).message("QR Code Revoked Successfully").build());
    }
}
