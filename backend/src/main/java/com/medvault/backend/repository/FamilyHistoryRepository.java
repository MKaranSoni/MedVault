package com.medvault.backend.repository;

import com.medvault.backend.entities.FamilyHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FamilyHistoryRepository extends JpaRepository<FamilyHistory, Long> {
    List<FamilyHistory> findByPatientProfileId(Long patientProfileId);
}
