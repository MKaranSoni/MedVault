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
public class AllergyDto {
    private Long id;

    @NotBlank(message = "Allergy type is required")
    private String allergyType;

    @NotBlank(message = "Allergy name is required")
    private String name;

    private String severity;
    private String notes;
}
