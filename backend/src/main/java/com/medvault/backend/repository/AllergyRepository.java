package com.medvault.backend.repository;

import com.medvault.backend.entities.Allergy;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AllergyRepository extends JpaRepository<Allergy, Long> {
    List<Allergy> findByPatientProfileId(Long patientProfileId);
}
