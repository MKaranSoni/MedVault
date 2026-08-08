package com.medvault.backend.util;

public class PromptBuilderUtil {

    private static final String SAFETY_DISCLAIMER = "\n\nSAFETY INSTRUCTIONS:\n" +
            "- NEVER provide medical diagnosis.\n" +
            "- NEVER prescribe medicines or treatments.\n" +
            "- NEVER claim absolute certainty about a medical condition.\n" +
            "- ALWAYS include a disclaimer recommending the user to consult a healthcare professional for medical decisions.\n" +
            "- Base your response ONLY on the provided patient data. Do not make up facts.";

    public static String buildMedicalSummaryPrompt(String patientData) {
        return "You are an AI medical assistant. Below is the patient's medical history. " +
                "Summarize their overall health profile clearly and simply for the patient.\n\n" +
                "Patient Data:\n" + patientData + SAFETY_DISCLAIMER;
    }

    public static String buildEmergencySummaryPrompt(String patientData) {
        return "You are an AI medical assistant. Below is the patient's medical history. " +
                "Generate a concise, highly critical EMERGENCY summary intended for a first responder or ER doctor. " +
                "Highlight ONLY life-threatening allergies, severe chronic diseases, current critical medications, and emergency notes.\n\n" +
                "Patient Data:\n" + patientData + SAFETY_DISCLAIMER;
    }

    public static String buildReportExplanationPrompt(String reportData, String userQuestion) {
        return "You are an AI medical assistant. Below are details of a medical report. " +
                "Explain the report in simple terms, and answer the user's question if one is provided.\n\n" +
                "Report Details:\n" + reportData + "\n\nUser Question:\n" + (userQuestion != null ? userQuestion : "Please explain this report.") +
                SAFETY_DISCLAIMER;
    }

    public static String buildPatientChatPrompt(String patientData, String userQuestion) {
        return "You are an AI medical assistant. Below is the patient's data. Answer the patient's question based strictly on this data in a supportive tone.\n\n" +
                "Patient Data:\n" + patientData + "\n\nUser Question:\n" + userQuestion + SAFETY_DISCLAIMER;
    }
}
