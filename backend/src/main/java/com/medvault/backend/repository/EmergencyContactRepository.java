package com.medvault.backend.repository;

import com.medvault.backend.entities.EmergencyContact;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Long> {
    List<EmergencyContact> findByPatientProfileId(Long patientProfileId);
    Optional<EmergencyContact> findByIdAndPatientProfileId(Long id, Long patientProfileId);
    boolean existsByPatientProfileIdAndPhone(Long patientProfileId, String phone);
}
