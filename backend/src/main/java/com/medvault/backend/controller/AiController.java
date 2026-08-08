package com.medvault.backend.controller;

import com.medvault.backend.dto.response.ApiResponse;
import com.medvault.backend.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @GetMapping("/summary/medical")
    public ResponseEntity<ApiResponse<String>> getMedicalSummary(Authentication authentication) {
        String summary = aiService.generateMedicalSummary(authentication.getName());
        return ResponseEntity.ok(ApiResponse.<String>builder().success(true).data(summary).build());
    }

    @GetMapping("/summary/emergency")
    public ResponseEntity<ApiResponse<String>> getEmergencySummary(Authentication authentication) {
        String summary = aiService.generateEmergencySummary(authentication.getName());
        return ResponseEntity.ok(ApiResponse.<String>builder().success(true).data(summary).build());
    }

    @PostMapping("/reports/{id}/explain")
    public ResponseEntity<ApiResponse<String>> explainReport(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body) {
        
        String question = body != null ? body.get("question") : null;
        String explanation = aiService.explainReport(authentication.getName(), id, question);
        return ResponseEntity.ok(ApiResponse.<String>builder().success(true).data(explanation).build());
    }

    @PostMapping("/chat")
    public ResponseEntity<ApiResponse<String>> chat(
            Authentication authentication,
            @RequestBody Map<String, String> body) {
            
        String question = body.get("question");
        if (question == null || question.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder().success(false).message("Question is required").build());
        }
        
        String answer = aiService.chat(authentication.getName(), question);
        return ResponseEntity.ok(ApiResponse.<String>builder().success(true).data(answer).build());
    }
}
