package com.medvault.backend.util;

import com.medvault.backend.dto.request.MedicalReportDto;
import com.medvault.backend.entities.MedicalReport;

public class MedicalReportMapper {

    public static MedicalReportDto toDto(MedicalReport entity) {
        if (entity == null) return null;
        return MedicalReportDto.builder()
                .id(entity.getId())
                .patientId(entity.getPatientProfile() != null ? entity.getPatientProfile().getId() : null)
                .reportTitle(entity.getReportTitle())
                .reportType(entity.getReportType())
                .description(entity.getDescription())
                .hospitalName(entity.getHospitalName())
                .doctorName(entity.getDoctorName())
                .reportDate(entity.getReportDate())
                .cloudinaryUrl(entity.getCloudinaryUrl())
                .publicId(entity.getPublicId())
                .fileSize(entity.getFileSize())
                .fileFormat(entity.getFileFormat())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
