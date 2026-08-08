package com.medvault.backend.dto.request.qr;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QrCodeDto {
    private String token;
    private String status;
    private String qrCodeImageBase64;
    private LocalDateTime generatedAt;
}
