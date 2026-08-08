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
public class ImmunizationDto {
    private Long id;

    @NotBlank(message = "Vaccine name is required")
    private String vaccineName;

    @PastOrPresent(message = "Date administered cannot be in the future")
    private LocalDate dateAdministered;

    private String boosterStatus;
}
