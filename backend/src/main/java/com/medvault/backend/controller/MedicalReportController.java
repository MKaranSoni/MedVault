package com.medvault.backend.controller;

import com.medvault.backend.dto.request.MedicalReportDto;
import com.medvault.backend.dto.response.ApiResponse;
import com.medvault.backend.service.MedicalReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patient/reports")
@RequiredArgsConstructor
public class MedicalReportController {

    private final MedicalReportService reportService;

    @PostMapping
    public ResponseEntity<ApiResponse<MedicalReportDto>> uploadReport(
            Authentication authentication,
            @RequestParam("file") MultipartFile file,
            @RequestParam("reportTitle") String reportTitle,
            @RequestParam("reportType") String reportType,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "hospitalName", required = false) String hospitalName,
            @RequestParam(value = "doctorName", required = false) String doctorName,
            @RequestParam(value = "reportDate", required = false) String reportDate) {
            
        MedicalReportDto dto = MedicalReportDto.builder()
                .reportTitle(reportTitle)
                .reportType(reportType)
                .description(description)
                .hospitalName(hospitalName)
                .doctorName(doctorName)
                .reportDate(reportDate != null && !reportDate.isEmpty() ? LocalDate.parse(reportDate) : null)
                .build();

        MedicalReportDto uploaded = reportService.uploadReport(authentication.getName(), dto, file);
        
        return new ResponseEntity<>(
                ApiResponse.<MedicalReportDto>builder().success(true).message("Report uploaded successfully").data(uploaded).build(),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MedicalReportDto>>> getReports(
            Authentication authentication,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String search) {
        List<MedicalReportDto> reports = reportService.getAllReports(authentication.getName(), type, search);
        return ResponseEntity.ok(ApiResponse.<List<MedicalReportDto>>builder().success(true).data(reports).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicalReportDto>> getReport(Authentication authentication, @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.<MedicalReportDto>builder().success(true).data(reportService.getReport(authentication.getName(), id)).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicalReportDto>> updateReport(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody MedicalReportDto dto) {
        return ResponseEntity.ok(ApiResponse.<MedicalReportDto>builder().success(true).data(reportService.updateReport(authentication.getName(), id, dto)).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReport(Authentication authentication, @PathVariable Long id) {
        reportService.deleteReport(authentication.getName(), id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().success(true).message("Report deleted").build());
    }
}
