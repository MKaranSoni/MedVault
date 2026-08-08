package com.medvault.backend.controller;

import com.medvault.backend.dto.response.ApiResponse;
import com.medvault.backend.dto.response.qr.EmergencyProfileDto;
import com.medvault.backend.dto.response.dashboard.DoctorDashboardDto;
import com.medvault.backend.dto.response.dashboard.IceProfileDto;
import com.medvault.backend.service.EmergencyDashboardService;
import com.medvault.backend.service.IceService;
import com.medvault.backend.service.QrCodeService;
import com.medvault.backend.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/emergency")
@RequiredArgsConstructor
public class EmergencyAccessController {

    private final QrCodeService qrCodeService;
    private final EmergencyDashboardService dashboardService;
    private final IceService iceService;
    private final AiService aiService;

    // ICE Mode Profile access
    @GetMapping("/{token}/ice")
    public ResponseEntity<ApiResponse<IceProfileDto>> getIceProfile(@PathVariable String token) {
        IceProfileDto profile = iceService.getIceProfile(token);
        return ResponseEntity.ok(ApiResponse.<IceProfileDto>builder().success(true).data(profile).build());
    }

    // Legacy public profile access
    @GetMapping("/{token}")
    public ResponseEntity<ApiResponse<EmergencyProfileDto>> getEmergencyProfile(@PathVariable String token) {
        EmergencyProfileDto profile = qrCodeService.getEmergencyProfileByToken(token);
        return ResponseEntity.ok(ApiResponse.<EmergencyProfileDto>builder().success(true).data(profile).build());
    }

    // New Doctor Dashboard access
    @GetMapping("/{token}/dashboard")
    public ResponseEntity<ApiResponse<DoctorDashboardDto>> getDashboard(@PathVariable String token) {
        DoctorDashboardDto dashboard = dashboardService.getEmergencyDashboard(token);
        return ResponseEntity.ok(ApiResponse.<DoctorDashboardDto>builder().success(true).data(dashboard).build());
    }

    // AI Chat for doctors
    @PostMapping("/{token}/chat")
    public ResponseEntity<ApiResponse<String>> chatWithAi(@PathVariable String token, @RequestBody Map<String, String> payload) {
        String question = payload.get("question");
        if (question == null || question.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder().success(false).message("Question is required").build());
        }
        String answer = aiService.chatByToken(token, question);
        return ResponseEntity.ok(ApiResponse.<String>builder().success(true).data(answer).build());
    }
}
