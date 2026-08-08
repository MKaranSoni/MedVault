package com.medvault.backend.controller;

import com.medvault.backend.dto.request.medical.*;
import com.medvault.backend.dto.response.ApiResponse;
import com.medvault.backend.service.MedicalRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patient/medical-records")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService service;

    // Allergies
    @GetMapping("/allergies")
    public ResponseEntity<ApiResponse<List<AllergyDto>>> getAllergies(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<List<AllergyDto>>builder().success(true).data(service.getAllergies(authentication.getName())).build());
    }

    @PostMapping("/allergies")
    public ResponseEntity<ApiResponse<AllergyDto>> addAllergy(Authentication authentication, @Valid @RequestBody AllergyDto dto) {
        return ResponseEntity.ok(ApiResponse.<AllergyDto>builder().success(true).data(service.addAllergy(authentication.getName(), dto)).build());
    }

    @DeleteMapping("/allergies/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAllergy(Authentication authentication, @PathVariable Long id) {
        service.deleteAllergy(authentication.getName(), id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().success(true).build());
    }

    // Chronic Diseases
    @GetMapping("/diseases")
    public ResponseEntity<ApiResponse<List<ChronicDiseaseDto>>> getDiseases(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<List<ChronicDiseaseDto>>builder().success(true).data(service.getDiseases(authentication.getName())).build());
    }

    @PostMapping("/diseases")
    public ResponseEntity<ApiResponse<ChronicDiseaseDto>> addDisease(Authentication authentication, @Valid @RequestBody ChronicDiseaseDto dto) {
        return ResponseEntity.ok(ApiResponse.<ChronicDiseaseDto>builder().success(true).data(service.addDisease(authentication.getName(), dto)).build());
    }

    @DeleteMapping("/diseases/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDisease(Authentication authentication, @PathVariable Long id) {
        service.deleteDisease(authentication.getName(), id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().success(true).build());
    }

    // Medications
    @GetMapping("/medications")
    public ResponseEntity<ApiResponse<List<MedicationDto>>> getMedications(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<List<MedicationDto>>builder().success(true).data(service.getMedications(authentication.getName())).build());
    }

    @PostMapping("/medications")
    public ResponseEntity<ApiResponse<MedicationDto>> addMedication(Authentication authentication, @Valid @RequestBody MedicationDto dto) {
        return ResponseEntity.ok(ApiResponse.<MedicationDto>builder().success(true).data(service.addMedication(authentication.getName(), dto)).build());
    }

    @DeleteMapping("/medications/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMedication(Authentication authentication, @PathVariable Long id) {
        service.deleteMedication(authentication.getName(), id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().success(true).build());
    }

    // Surgeries
    @GetMapping("/surgeries")
    public ResponseEntity<ApiResponse<List<SurgeryDto>>> getSurgeries(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<List<SurgeryDto>>builder().success(true).data(service.getSurgeries(authentication.getName())).build());
    }

    @PostMapping("/surgeries")
    public ResponseEntity<ApiResponse<SurgeryDto>> addSurgery(Authentication authentication, @Valid @RequestBody SurgeryDto dto) {
        return ResponseEntity.ok(ApiResponse.<SurgeryDto>builder().success(true).data(service.addSurgery(authentication.getName(), dto)).build());
    }

    @DeleteMapping("/surgeries/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSurgery(Authentication authentication, @PathVariable Long id) {
        service.deleteSurgery(authentication.getName(), id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().success(true).build());
    }

    // Immunizations
    @GetMapping("/immunizations")
    public ResponseEntity<ApiResponse<List<ImmunizationDto>>> getImmunizations(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<List<ImmunizationDto>>builder().success(true).data(service.getImmunizations(authentication.getName())).build());
    }

    @PostMapping("/immunizations")
    public ResponseEntity<ApiResponse<ImmunizationDto>> addImmunization(Authentication authentication, @Valid @RequestBody ImmunizationDto dto) {
        return ResponseEntity.ok(ApiResponse.<ImmunizationDto>builder().success(true).data(service.addImmunization(authentication.getName(), dto)).build());
    }

    @DeleteMapping("/immunizations/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteImmunization(Authentication authentication, @PathVariable Long id) {
        service.deleteImmunization(authentication.getName(), id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().success(true).build());
    }

    // Family History
    @GetMapping("/family-histories")
    public ResponseEntity<ApiResponse<List<FamilyHistoryDto>>> getFamilyHistories(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.<List<FamilyHistoryDto>>builder().success(true).data(service.getFamilyHistories(authentication.getName())).build());
    }

    @PostMapping("/family-histories")
    public ResponseEntity<ApiResponse<FamilyHistoryDto>> addFamilyHistory(Authentication authentication, @Valid @RequestBody FamilyHistoryDto dto) {
        return ResponseEntity.ok(ApiResponse.<FamilyHistoryDto>builder().success(true).data(service.addFamilyHistory(authentication.getName(), dto)).build());
    }

    @DeleteMapping("/family-histories/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFamilyHistory(Authentication authentication, @PathVariable Long id) {
        service.deleteFamilyHistory(authentication.getName(), id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().success(true).build());
    }
}
