package com.medvault.backend.service;

import com.medvault.backend.dto.request.EmergencyContactDto;
import com.medvault.backend.dto.request.medical.MedicationDto;
import com.medvault.backend.dto.response.dashboard.CriticalAlertDto;
import com.medvault.backend.dto.response.dashboard.IceProfileDto;
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
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IceServiceImpl implements IceService {

    private final QrCodeRepository qrCodeRepository;
    private final AllergyRepository allergyRepository;
    private final ChronicDiseaseRepository diseaseRepository;
    private final MedicationRepository medicationRepository;
    private final AiService aiService;

    @Override
    @Transactional(readOnly = true)
    public IceProfileDto getIceProfile(String token) {
        QrCode qrCode = qrCodeRepository.findByTokenAndStatus(token, QrCode.QrStatus.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or Revoked Emergency Token"));

        PatientProfile profile = qrCode.getPatientProfile();
        User user = profile.getUser();

        Integer age = profile.getDateOfBirth() != null ? Period.between(profile.getDateOfBirth(), LocalDate.now()).getYears() : null;
        String organDonorStatus = profile.getOrganDonorStatus() != null ? (profile.getOrganDonorStatus() ? "Yes" : "No") : "Unknown";

        List<Allergy> allergies = allergyRepository.findByPatientProfileId(profile.getId());
        List<ChronicDisease> diseases = diseaseRepository.findByPatientProfileId(profile.getId());
        List<Medication> medications = medicationRepository.findByPatientProfileId(profile.getId());

        List<CriticalAlertDto> alerts = new ArrayList<>();
        
        for (Allergy a : allergies) {
            if ("Severe".equalsIgnoreCase(a.getSeverity())) {
                alerts.add(CriticalAlertDto.builder().title("Severe Allergy: " + a.getName()).description("Type: " + a.getAllergyType()).severity("CRITICAL").type("ALLERGY").build());
            }
        }
        for (ChronicDisease d : diseases) {
            alerts.add(CriticalAlertDto.builder().title("Chronic Disease: " + d.getDiseaseName()).description("Existing condition").severity("HIGH").type("DISEASE").build());
        }

        String aiEmergencySummary = "";
        try {
            aiEmergencySummary = aiService.generateEmergencySummary(user.getEmail());
        } catch (Exception e) {
            aiEmergencySummary = "AI Summary unavailable.";
        }

        List<MedicationDto> medicationDtos = medications.stream().map(MedicalRecordMapper::toMedicationDto).collect(Collectors.toList());

        List<EmergencyContactDto> contacts = (profile.getEmergencyContacts() != null ? profile.getEmergencyContacts() : List.<EmergencyContact>of())
                .stream().map(c -> EmergencyContactDto.builder()
                        .id(c.getId()).name(c.getName()).relationship(c.getRelationship()).phone(c.getPhone()).isPrimary(c.getIsPrimary()).build())
                .collect(Collectors.toList());

        return IceProfileDto.builder()
                .patientName(user.getFirstName() + " " + user.getLastName())
                .age(age)
                .gender(profile.getGender())
                .bloodGroup(profile.getBloodGroup())
                .height(profile.getHeight())
                .weight(profile.getWeight())
                .organDonorStatus(organDonorStatus)
                .emergencyNotes(profile.getEmergencyNotes())
                .criticalAlerts(alerts)
                .currentMedications(medicationDtos)
                .aiEmergencySummary(aiEmergencySummary)
                .emergencyContacts(contacts)
                .build();
    }
}
