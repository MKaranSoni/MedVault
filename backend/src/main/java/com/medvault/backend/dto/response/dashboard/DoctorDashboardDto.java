package com.medvault.backend.dto.response.dashboard;

import com.medvault.backend.dto.request.EmergencyContactDto;
import com.medvault.backend.dto.request.medical.MedicationDto;
import com.medvault.backend.dto.request.MedicalReportDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDashboardDto {
    // 1. Emergency Patient Overview
    private String patientName;
    private Integer age;
    private String gender;
    private String bloodGroup;
    private String profilePhotoUrl;
    private String organDonorStatus;
    private String emergencyNotes;

    // 2. Critical Alerts
    private List<CriticalAlertDto> criticalAlerts;

    // 3. AI Emergency Summary
    private String aiEmergencySummary;

    // 4. Medical History Timeline
    private List<TimelineEventDto> timeline;

    // 5. Current Medications
    private List<MedicationDto> currentMedications;

    // 6. Medical Reports
    private List<MedicalReportDto> medicalReports;

    // 7. Emergency Contacts
    private List<EmergencyContactDto> emergencyContacts;
}
