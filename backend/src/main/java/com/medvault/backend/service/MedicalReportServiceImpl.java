package com.medvault.backend.service;

import com.medvault.backend.dto.request.MedicalReportDto;
import com.medvault.backend.entities.MedicalReport;
import com.medvault.backend.entities.PatientProfile;
import com.medvault.backend.exception.ResourceNotFoundException;
import com.medvault.backend.repository.MedicalReportRepository;
import com.medvault.backend.repository.PatientProfileRepository;
import com.medvault.backend.util.FileUploadUtil;
import com.medvault.backend.util.MedicalReportMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalReportServiceImpl implements MedicalReportService {

    private final MedicalReportRepository reportRepository;
    private final PatientProfileRepository patientProfileRepository;
    private final CloudinaryService cloudinaryService;

    private PatientProfile getPatientProfile(String email) {
        return patientProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
    }

    @Override
    @Transactional
    public MedicalReportDto uploadReport(String email, MedicalReportDto dto, MultipartFile file) {
        PatientProfile profile = getPatientProfile(email);
        
        FileUploadUtil.validateFile(file);
        
        Map<String, String> uploadResult = cloudinaryService.uploadFile(file, "medvault/reports/" + profile.getId());
        
        MedicalReport report = MedicalReport.builder()
                .patientProfile(profile)
                .reportTitle(dto.getReportTitle())
                .reportType(dto.getReportType())
                .description(dto.getDescription())
                .hospitalName(dto.getHospitalName())
                .doctorName(dto.getDoctorName())
                .reportDate(dto.getReportDate())
                .cloudinaryUrl(uploadResult.get("url"))
                .publicId(uploadResult.get("public_id"))
                .fileFormat(uploadResult.get("format"))
                .fileSize(file.getSize())
                .build();
                
        return MedicalReportMapper.toDto(reportRepository.save(report));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicalReportDto> getAllReports(String email, String type, String search) {
        PatientProfile profile = getPatientProfile(email);
        List<MedicalReport> reports;
        
        if (type != null && !type.isEmpty()) {
            reports = reportRepository.findByPatientProfileIdAndReportTypeOrderByCreatedAtDesc(profile.getId(), type);
        } else if (search != null && !search.isEmpty()) {
            reports = reportRepository.findByPatientProfileIdAndReportTitleContainingIgnoreCase(profile.getId(), search);
        } else {
            reports = reportRepository.findByPatientProfileIdOrderByCreatedAtDesc(profile.getId());
        }
        
        return reports.stream().map(MedicalReportMapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MedicalReportDto getReport(String email, Long id) {
        PatientProfile profile = getPatientProfile(email);
        MedicalReport report = reportRepository.findByIdAndPatientProfileId(id, profile.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Report not found"));
        return MedicalReportMapper.toDto(report);
    }

    @Override
    @Transactional
    public MedicalReportDto updateReport(String email, Long id, MedicalReportDto dto) {
        PatientProfile profile = getPatientProfile(email);
        MedicalReport report = reportRepository.findByIdAndPatientProfileId(id, profile.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Report not found"));
                
        if (dto.getReportTitle() != null) report.setReportTitle(dto.getReportTitle());
        if (dto.getReportType() != null) report.setReportType(dto.getReportType());
        if (dto.getDescription() != null) report.setDescription(dto.getDescription());
        if (dto.getHospitalName() != null) report.setHospitalName(dto.getHospitalName());
        if (dto.getDoctorName() != null) report.setDoctorName(dto.getDoctorName());
        if (dto.getReportDate() != null) report.setReportDate(dto.getReportDate());
        
        return MedicalReportMapper.toDto(reportRepository.save(report));
    }

    @Override
    @Transactional
    public void deleteReport(String email, Long id) {
        PatientProfile profile = getPatientProfile(email);
        MedicalReport report = reportRepository.findByIdAndPatientProfileId(id, profile.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Report not found"));
                
        cloudinaryService.deleteFile(report.getPublicId());
        reportRepository.delete(report);
    }
}
