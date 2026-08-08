package com.medvault.backend.service;

import com.medvault.backend.dto.request.EmergencyContactDto;
import com.medvault.backend.dto.request.medical.*;
import com.medvault.backend.dto.request.qr.QrCodeDto;
import com.medvault.backend.dto.response.qr.EmergencyProfileDto;
import com.medvault.backend.entities.*;
import com.medvault.backend.exception.ResourceNotFoundException;
import com.medvault.backend.repository.*;
import com.medvault.backend.util.MedicalRecordMapper;
import com.medvault.backend.util.PatientProfileMapper;
import com.medvault.backend.util.QrUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QrCodeServiceImpl implements QrCodeService {

    private final QrCodeRepository qrCodeRepository;
    private final PatientProfileRepository patientProfileRepository;
    private final AllergyRepository allergyRepository;
    private final ChronicDiseaseRepository diseaseRepository;
    private final MedicationRepository medicationRepository;
    private final SurgeryRepository surgeryRepository;
    private final AiService aiService;

    private PatientProfile getPatientProfile(String email) {
        return patientProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
    }

    @Override
    @Transactional
    public QrCodeDto generateOrGetQr(String email, String frontendBaseUrl) {
        PatientProfile profile = getPatientProfile(email);
        Optional<QrCode> existing = qrCodeRepository.findByPatientProfileId(profile.getId());

        QrCode qrCode;
        if (existing.isPresent()) {
            qrCode = existing.get();
            if (qrCode.getStatus() == QrCode.QrStatus.REVOKED) {
                // Generate new token if revoked
                qrCode.setToken(QrUtil.generateToken());
                qrCode.setStatus(QrCode.QrStatus.ACTIVE);
                qrCode = qrCodeRepository.save(qrCode);
            }
        } else {
            qrCode = QrCode.builder()
                    .patientProfile(profile)
                    .token(QrUtil.generateToken())
                    .status(QrCode.QrStatus.ACTIVE)
                    .build();
            qrCode = qrCodeRepository.save(qrCode);
        }
        return buildQrCodeDto(qrCode, frontendBaseUrl);
    }

    @Override
    @Transactional
    public QrCodeDto regenerateQr(String email, String frontendBaseUrl) {
        PatientProfile profile = getPatientProfile(email);
        QrCode qrCode = qrCodeRepository.findByPatientProfileId(profile.getId())
                .orElseThrow(() -> new ResourceNotFoundException("No existing QR to regenerate. Please generate one first."));
        
        qrCode.setToken(QrUtil.generateToken());
        qrCode.setStatus(QrCode.QrStatus.ACTIVE);
        return buildQrCodeDto(qrCodeRepository.save(qrCode), frontendBaseUrl);
    }

    @Override
    @Transactional
    public void revokeQr(String email) {
        PatientProfile profile = getPatientProfile(email);
        QrCode qrCode = qrCodeRepository.findByPatientProfileId(profile.getId())
                .orElseThrow(() -> new ResourceNotFoundException("QR Code not found"));
        qrCode.setStatus(QrCode.QrStatus.REVOKED);
        qrCodeRepository.save(qrCode);
    }

    @Override
    @Transactional(readOnly = true)
    public QrCodeDto getQrStatus(String email, String frontendBaseUrl) {
        PatientProfile profile = getPatientProfile(email);
        QrCode qrCode = qrCodeRepository.findByPatientProfileId(profile.getId())
                .orElseThrow(() -> new ResourceNotFoundException("QR Code not generated"));
        return buildQrCodeDto(qrCode, frontendBaseUrl);
    }

    @Override
    @Transactional(readOnly = true)
    public EmergencyProfileDto getEmergencyProfileByToken(String token) {
        QrCode qrCode = qrCodeRepository.findByTokenAndStatus(token, QrCode.QrStatus.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or Revoked Emergency QR Code"));
        
        PatientProfile profile = qrCode.getPatientProfile();
        
        List<AllergyDto> allergies = allergyRepository.findByPatientProfileId(profile.getId())
                .stream().map(MedicalRecordMapper::toAllergyDto).collect(Collectors.toList());
        List<ChronicDiseaseDto> diseases = diseaseRepository.findByPatientProfileId(profile.getId())
                .stream().map(MedicalRecordMapper::toDiseaseDto).collect(Collectors.toList());
        List<MedicationDto> medications = medicationRepository.findByPatientProfileId(profile.getId())
                .stream().map(MedicalRecordMapper::toMedicationDto).collect(Collectors.toList());
        List<SurgeryDto> surgeries = surgeryRepository.findByPatientProfileId(profile.getId())
                .stream().map(MedicalRecordMapper::toSurgeryDto).collect(Collectors.toList());
        List<EmergencyContactDto> contacts = (profile.getEmergencyContacts() != null ? profile.getEmergencyContacts() : List.<EmergencyContact>of())
                .stream().map(c -> EmergencyContactDto.builder()
                        .id(c.getId()).name(c.getName()).relationship(c.getRelationship()).phone(c.getPhone()).isPrimary(c.getIsPrimary()).build())
                .collect(Collectors.toList());

        String aiEmergencySummary = "";
        try {
             aiEmergencySummary = aiService.generateEmergencySummary(profile.getUser().getEmail());
        } catch (Exception e) {
             aiEmergencySummary = "AI Summary unavailable at this time.";
        }

        return EmergencyProfileDto.builder()
                .gender(profile.getGender())
                .bloodGroup(profile.getBloodGroup())
                .height(profile.getHeight() != null ? profile.getHeight().toString() : null)
                .weight(profile.getWeight() != null ? profile.getWeight().toString() : null)
                .organDonorStatus(profile.getOrganDonorStatus() != null ? (profile.getOrganDonorStatus() ? "Yes" : "No") : "Unknown")
                .emergencyNotes(profile.getEmergencyNotes())
                .specialInstructions(profile.getSpecialInstructions())
                .allergies(allergies)
                .chronicDiseases(diseases)
                .medications(medications)
                .surgeries(surgeries)
                .emergencyContacts(contacts)
                .aiEmergencySummary(aiEmergencySummary)
                .build();
    }

    private QrCodeDto buildQrCodeDto(QrCode qrCode, String frontendBaseUrl) {
        String qrContentUrl = frontendBaseUrl + "/emergency/" + qrCode.getToken();
        String base64Image = QrUtil.generateQrCodeBase64(qrContentUrl, 400, 400);
        
        return QrCodeDto.builder()
                .token(qrCode.getToken())
                .status(qrCode.getStatus().name())
                .generatedAt(qrCode.getGeneratedAt())
                .qrCodeImageBase64(base64Image)
                .build();
    }
}
