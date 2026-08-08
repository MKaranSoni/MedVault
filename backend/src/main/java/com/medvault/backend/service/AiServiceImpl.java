package com.medvault.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.medvault.backend.config.GeminiConfig;
import com.medvault.backend.dto.request.ai.GeminiRequest;
import com.medvault.backend.dto.response.ai.GeminiResponse;
import com.medvault.backend.entities.*;
import com.medvault.backend.exception.ResourceNotFoundException;
import com.medvault.backend.repository.*;
import com.medvault.backend.util.PromptBuilderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final GeminiConfig geminiConfig;
    private final RestTemplate restTemplate;
    
    private final PatientProfileRepository patientProfileRepository;
    private final AllergyRepository allergyRepository;
    private final ChronicDiseaseRepository diseaseRepository;
    private final MedicationRepository medicationRepository;
    private final MedicalReportRepository medicalReportRepository;
    private final QrCodeRepository qrCodeRepository;

    private String callGeminiApi(String prompt) {
        String url = geminiConfig.getApiUrl() + "?key=" + geminiConfig.getApiKey();
        
        GeminiRequest.Part part = new GeminiRequest.Part(prompt);
        GeminiRequest.Content content = new GeminiRequest.Content(Collections.singletonList(part));
        GeminiRequest request = new GeminiRequest(Collections.singletonList(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<GeminiRequest> entity = new HttpEntity<>(request, headers);

        try {
            GeminiResponse response = restTemplate.postForObject(url, entity, GeminiResponse.class);
            if (response != null && response.getCandidates() != null && !response.getCandidates().isEmpty()) {
                return response.getCandidates().get(0).getContent().getParts().get(0).getText();
            }
            return "AI failed to generate a response.";
        } catch (Exception e) {
            System.err.println("Gemini API Error: " + e.getMessage());
            return "An error occurred while communicating with the AI service. Please try again later.";
        }
    }

    @Transactional(readOnly = true)
    public String gatherPatientData(String email) {
        PatientProfile profile = patientProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        
        List<Allergy> allergies = allergyRepository.findByPatientProfileId(profile.getId());
        List<ChronicDisease> diseases = diseaseRepository.findByPatientProfileId(profile.getId());
        List<Medication> medications = medicationRepository.findByPatientProfileId(profile.getId());
        
        Map<String, Object> data = new HashMap<>();
        data.put("basicInfo", Map.of(
            "gender", profile.getGender() != null ? profile.getGender() : "N/A",
            "bloodGroup", profile.getBloodGroup() != null ? profile.getBloodGroup() : "N/A",
            "age_dob", profile.getDateOfBirth() != null ? profile.getDateOfBirth().toString() : "N/A"
        ));
        
        data.put("allergies", allergies.stream().map(a -> a.getName() + " (" + a.getSeverity() + ")").toList());
        data.put("diseases", diseases.stream().map(ChronicDisease::getDiseaseName).toList());
        data.put("medications", medications.stream().map(m -> m.getMedicineName() + " " + m.getDosage()).toList());
        data.put("emergencyNotes", profile.getEmergencyNotes() != null ? profile.getEmergencyNotes() : "None");

        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            return mapper.writeValueAsString(data);
        } catch (Exception e) {
            return data.toString();
        }
    }

    @Override
    public String generateMedicalSummary(String email) {
        String patientData = gatherPatientData(email);
        String prompt = PromptBuilderUtil.buildMedicalSummaryPrompt(patientData);
        return callGeminiApi(prompt);
    }

    @Override
    public String generateEmergencySummary(String email) {
        String patientData = gatherPatientData(email);
        String prompt = PromptBuilderUtil.buildEmergencySummaryPrompt(patientData);
        return callGeminiApi(prompt);
    }

    @Override
    @Transactional(readOnly = true)
    public String explainReport(String email, Long reportId, String question) {
        PatientProfile profile = patientProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
                
        MedicalReport report = medicalReportRepository.findByIdAndPatientProfileId(reportId, profile.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Report not found"));
                
        Map<String, String> reportData = new HashMap<>();
        reportData.put("title", report.getReportTitle());
        reportData.put("type", report.getReportType());
        reportData.put("description", report.getDescription() != null ? report.getDescription() : "N/A");
        
        String prompt = PromptBuilderUtil.buildReportExplanationPrompt(reportData.toString(), question);
        return callGeminiApi(prompt);
    }

    @Override
    public String chat(String email, String question) {
        String patientData = gatherPatientData(email);
        String prompt = PromptBuilderUtil.buildPatientChatPrompt(patientData, question);
        return callGeminiApi(prompt);
    }

    @Override
    @Transactional(readOnly = true)
    public String chatByToken(String token, String question) {
        QrCode qrCode = qrCodeRepository.findByTokenAndStatus(token, QrCode.QrStatus.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or Revoked Emergency QR Code"));
        String patientData = gatherPatientData(qrCode.getPatientProfile().getUser().getEmail());
        String prompt = PromptBuilderUtil.buildPatientChatPrompt(patientData, question);
        return callGeminiApi(prompt);
    }
}
