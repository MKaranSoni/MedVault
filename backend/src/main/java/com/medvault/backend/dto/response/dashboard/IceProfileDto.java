package com.medvault.backend.dto.response.dashboard;

import com.medvault.backend.dto.request.EmergencyContactDto;
import com.medvault.backend.dto.request.medical.MedicationDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IceProfileDto {
    private String patientName;
    private Integer age;
    private String gender;
    private String bloodGroup;
    private Double height;
    private Double weight;
    private String organDonorStatus;
    private String emergencyNotes;

    // Critical alerts
    private List<CriticalAlertDto> criticalAlerts;

    // Current Medications
    private List<MedicationDto> currentMedications;

    // AI Emergency Summary
    private String aiEmergencySummary;

    // Emergency Contacts
    private List<EmergencyContactDto> emergencyContacts;
}
