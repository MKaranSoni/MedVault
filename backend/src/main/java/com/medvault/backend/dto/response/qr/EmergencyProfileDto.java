package com.medvault.backend.dto.response.qr;

import com.medvault.backend.dto.request.medical.AllergyDto;
import com.medvault.backend.dto.request.medical.ChronicDiseaseDto;
import com.medvault.backend.dto.request.medical.MedicationDto;
import com.medvault.backend.dto.request.medical.SurgeryDto;
import com.medvault.backend.dto.request.EmergencyContactDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyProfileDto {
    // Only vital stats, no PII (like Name, Email, Address)
    private String gender;
    private String bloodGroup;
    private String height;
    private String weight;
    private String organDonorStatus;
    private String emergencyNotes;
    private String specialInstructions;

    private List<AllergyDto> allergies;
    private List<ChronicDiseaseDto> chronicDiseases;
    private List<MedicationDto> medications;
    private List<SurgeryDto> surgeries;
    private List<EmergencyContactDto> emergencyContacts;
    
    // An AI generated emergency summary
    private String aiEmergencySummary;
}
