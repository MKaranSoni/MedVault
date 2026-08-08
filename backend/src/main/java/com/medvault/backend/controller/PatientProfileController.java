package com.medvault.backend.controller;

import com.medvault.backend.dto.request.PatientProfileDto;
import com.medvault.backend.dto.response.ApiResponse;
import com.medvault.backend.service.PatientProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/patient/profile")
@RequiredArgsConstructor
public class PatientProfileController {

    private final PatientProfileService patientProfileService;

    @GetMapping
    public ResponseEntity<ApiResponse<PatientProfileDto>> getProfile(Authentication authentication) {
        PatientProfileDto profile = patientProfileService.getProfileByEmail(authentication.getName());
        return ResponseEntity.ok(
                ApiResponse.<PatientProfileDto>builder()
                        .success(true)
                        .message("Profile fetched successfully")
                        .data(profile)
                        .build()
        );
    }

    @PutMapping
    public ResponseEntity<ApiResponse<PatientProfileDto>> updateProfile(
            Authentication authentication,
            @Valid @RequestBody PatientProfileDto profileDto
    ) {
        PatientProfileDto updatedProfile = patientProfileService.updateProfile(authentication.getName(), profileDto);
        return ResponseEntity.ok(
                ApiResponse.<PatientProfileDto>builder()
                        .success(true)
                        .message("Profile updated successfully")
                        .data(updatedProfile)
                        .build()
        );
    }
}
