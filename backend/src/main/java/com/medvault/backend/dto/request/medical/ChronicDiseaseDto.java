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
public class ChronicDiseaseDto {
    private Long id;

    @NotBlank(message = "Disease name is required")
    private String diseaseName;
}
