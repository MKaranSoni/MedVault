package com.medvault.backend.dto.request;

import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientProfileDto {
    
    private String profilePictureUrl;
    
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Phone number is invalid")
    private String phone;
    
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;
    
    private String gender;
    
    @Pattern(regexp = "^(A|B|AB|O)[+-]$", message = "Blood group must be valid (e.g., A+, O-)")
    private String bloodGroup;
    
    @Positive(message = "Height must be positive")
    private Double height;
    
    @Positive(message = "Weight must be positive")
    private Double weight;
    
    private Boolean organDonorStatus;
    
    // Lifestyle Information
    private String smokingStatus;
    private String alcoholConsumption;
    private String exerciseFrequency;
    
    @Size(max = 2000, message = "Emergency notes too long")
    private String emergencyNotes;

    @Size(max = 2000, message = "Special instructions too long")
    private String specialInstructions;
}
