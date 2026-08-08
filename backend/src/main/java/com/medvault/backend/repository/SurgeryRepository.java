package com.medvault.backend.repository;

import com.medvault.backend.entities.Surgery;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SurgeryRepository extends JpaRepository<Surgery, Long> {
    List<Surgery> findByPatientProfileId(Long patientProfileId);
}
