package com.medvault.backend.service;

public interface AiService {
    String generateMedicalSummary(String email);
    String generateEmergencySummary(String email);
    String explainReport(String email, Long reportId, String question);
    String chat(String email, String question);
    String chatByToken(String token, String question);
}
