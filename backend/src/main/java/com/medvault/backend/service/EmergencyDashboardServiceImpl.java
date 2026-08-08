package com.medvault.backend.service;

import com.medvault.backend.dto.request.EmergencyContactDto;
import com.medvault.backend.dto.request.medical.MedicationDto;
import com.medvault.backend.dto.response.dashboard.CriticalAlertDto;
import com.medvault.backend.dto.response.dashboard.DoctorDashboardDto;
import com.medvault.backend.dto.response.dashboard.TimelineEventDto;
import com.medvault.backend.dto.request.MedicalReportDto;
import com.medvault.backend.entities.*;
import com.medvault.backend.exception.ResourceNotFoundException;
import com.medvault.backend.repository.*;
import com.medvault.backend.util.MedicalRecordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmergencyDashboardServiceImpl implements EmergencyDashboardService {

    private final QrCodeRepository qrCodeRepository;
    private final AllergyRepository allergyRepository;
    private final ChronicDiseaseRepository diseaseRepository;
    private final MedicationRepository medicationRepository;
    private final SurgeryRepository surgeryRepository;
    private final ImmunizationRepository immunizationRepository;
    private final MedicalReportRepository medicalReportRepository;
    private final AiService aiService;

    @Override
    @Transactional(readOnly = true)
    public DoctorDashboardDto getEmergencyDashboard(String token) {
        QrCode qrCode = qrCodeRepository.findByTokenAndStatus(token, QrCode.QrStatus.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or Revoked Emergency Token"));

        PatientProfile profile = qrCode.getPatientProfile();
        User user = profile.getUser();

        Integer age = profile.getDateOfBirth() != null ? Period.between(profile.getDateOfBirth(), LocalDate.now()).getYears() : null;

        // 1. Patient Overview
        String organDonorStatus = profile.getOrganDonorStatus() != null ? (profile.getOrganDonorStatus() ? "Yes" : "No") : "Unknown";
        
        // Fetch entities
        List<Allergy> allergies = allergyRepository.findByPatientProfileId(profile.getId());
        List<ChronicDisease> diseases = diseaseRepository.findByPatientProfileId(profile.getId());
        List<Medication> medications = medicationRepository.findByPatientProfileId(profile.getId());
        List<Surgery> surgeries = surgeryRepository.findByPatientProfileId(profile.getId());
        List<Immunization> immunizations = immunizationRepository.findByPatientProfileId(profile.getId());
        List<MedicalReport> reports = medicalReportRepository.findByPatientProfileIdOrderByCreatedAtDesc(profile.getId());

        // 2. Critical Alerts
        List<CriticalAlertDto> alerts = new ArrayList<>();
        
        for (Allergy a : allergies) {
            if ("Severe".equalsIgnoreCase(a.getSeverity())) {
                alerts.add(CriticalAlertDto.builder().title("Severe Allergy: " + a.getName()).description("Type: " + a.getAllergyType()).severity("CRITICAL").type("ALLERGY").build());
            }
        }
        for (ChronicDisease d : diseases) {
            alerts.add(CriticalAlertDto.builder().title("Chronic Disease: " + d.getDiseaseName()).description("Existing condition").severity("HIGH").type("DISEASE").build());
        }

        // 3. AI Emergency Summary
        String aiEmergencySummary = "";
        try {
            aiEmergencySummary = aiService.generateEmergencySummary(user.getEmail());
        } catch (Exception e) {
            aiEmergencySummary = "AI Summary unavailable.";
        }

        // 4. Timeline
        List<TimelineEventDto> timeline = new ArrayList<>();
        for (Surgery s : surgeries) {
            if (s.getSurgeryDate() != null) {
                timeline.add(TimelineEventDto.builder().date(s.getSurgeryDate()).title("Surgery: " + s.getSurgeryName()).description("Hospital: " + s.getHospital()).type("SURGERY").build());
            }
        }
        for (Immunization i : immunizations) {
            if (i.getDateAdministered() != null) {
                timeline.add(TimelineEventDto.builder().date(i.getDateAdministered()).title("Vaccination: " + i.getVaccineName()).description("Booster Status: " + i.getBoosterStatus()).type("IMMUNIZATION").build());
            }
        }
        timeline.sort(Comparator.comparing(TimelineEventDto::getDate).reversed()); // Most recent first

        // 5. Medications
        List<MedicationDto> medicationDtos = medications.stream().map(MedicalRecordMapper::toMedicationDto).collect(Collectors.toList());

        // 6. Medical Reports
        List<MedicalReportDto> reportDtos = reports.stream().map(r -> MedicalReportDto.builder()
                .id(r.getId()).reportTitle(r.getReportTitle()).reportType(r.getReportType())
                .hospitalName(r.getHospitalName()).cloudinaryUrl(r.getCloudinaryUrl()).createdAt(r.getCreatedAt()).build())
                .collect(Collectors.toList());

        // 7. Contacts
        List<EmergencyContactDto> contacts = (profile.getEmergencyContacts() != null ? profile.getEmergencyContacts() : List.<EmergencyContact>of())
                .stream().map(c -> EmergencyContactDto.builder()
                        .id(c.getId()).name(c.getName()).relationship(c.getRelationship()).phone(c.getPhone()).isPrimary(c.getIsPrimary()).build())
                .collect(Collectors.toList());

        return DoctorDashboardDto.builder()
                .patientName(user.getFirstName() + " " + user.getLastName())
                .age(age)
                .gender(profile.getGender())
                .bloodGroup(profile.getBloodGroup())
                .profilePhotoUrl(profile.getProfilePictureUrl())
                .organDonorStatus(organDonorStatus)
                .emergencyNotes(profile.getEmergencyNotes())
                .criticalAlerts(alerts)
                .aiEmergencySummary(aiEmergencySummary)
                .timeline(timeline)
                .currentMedications(medicationDtos)
                .medicalReports(reportDtos)
                .emergencyContacts(contacts)
                .build();
    }
}
