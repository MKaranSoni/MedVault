package com.medvault.backend.dto.response.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CriticalAlertDto {
    private String title;
    private String description;
    private String severity; // HIGH, CRITICAL
    private String type; // ALLERGY, DISEASE, MEDICATION
}
