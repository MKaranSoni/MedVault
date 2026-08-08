package com.medvault.backend.dto.request.medical;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SurgeryDto {
    private Long id;

    @NotBlank(message = "Surgery name is required")
    private String surgeryName;

    private String hospital;

    @PastOrPresent(message = "Surgery date cannot be in the future")
    private LocalDate surgeryDate;

    private String outcome;
    private String notes;
}
