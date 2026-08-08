package com.medvault.backend.repository;

import com.medvault.backend.entities.MedicalReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MedicalReportRepository extends JpaRepository<MedicalReport, Long> {
    List<MedicalReport> findByPatientProfileIdOrderByCreatedAtDesc(Long patientProfileId);
    List<MedicalReport> findByPatientProfileIdAndReportTypeOrderByCreatedAtDesc(Long patientProfileId, String reportType);
    List<MedicalReport> findByPatientProfileIdAndReportTitleContainingIgnoreCase(Long patientProfileId, String title);
    Optional<MedicalReport> findByIdAndPatientProfileId(Long id, Long patientProfileId);
}
