package com.medvault.backend.repository;

import com.medvault.backend.entities.Immunization;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ImmunizationRepository extends JpaRepository<Immunization, Long> {
    List<Immunization> findByPatientProfileId(Long patientProfileId);
}
