package com.medvault.backend.repository;

import com.medvault.backend.entities.ChronicDisease;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChronicDiseaseRepository extends JpaRepository<ChronicDisease, Long> {
    List<ChronicDisease> findByPatientProfileId(Long patientProfileId);
}
