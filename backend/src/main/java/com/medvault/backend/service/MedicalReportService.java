package com.medvault.backend.service;

import com.medvault.backend.dto.request.MedicalReportDto;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface MedicalReportService {
    MedicalReportDto uploadReport(String email, MedicalReportDto dto, MultipartFile file);
    List<MedicalReportDto> getAllReports(String email, String type, String search);
    MedicalReportDto getReport(String email, Long id);
    MedicalReportDto updateReport(String email, Long id, MedicalReportDto dto);
    void deleteReport(String email, Long id);
}
