package com.medvault.backend.repository;

import com.medvault.backend.entities.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicationRepository extends JpaRepository<Medication, Long> {
    List<Medication> findByPatientProfileId(Long patientProfileId);
}
