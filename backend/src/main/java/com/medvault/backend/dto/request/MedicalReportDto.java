package com.medvault.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicalReportDto {
    private Long id;
    private Long patientId;
    
    @NotBlank(message = "Report title is required")
    private String reportTitle;
    
    @NotBlank(message = "Report type is required")
    private String reportType;
    
    private String description;
    private String hospitalName;
    private String doctorName;
    private LocalDate reportDate;
    
    // Cloudinary details, read-only mostly from DTO context but needed for response
    private String cloudinaryUrl;
    private String publicId;
    private Long fileSize;
    private String fileFormat;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
