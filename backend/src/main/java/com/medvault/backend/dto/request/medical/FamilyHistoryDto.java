package com.medvault.backend.dto.request.medical;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FamilyHistoryDto {
    private Long id;

    @NotBlank(message = "Relationship is required")
    private String relationship;

    @NotBlank(message = "Medical condition is required")
    private String medicalCondition;

    private String notes;
}
