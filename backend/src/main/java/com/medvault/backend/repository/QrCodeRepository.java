package com.medvault.backend.repository;

import com.medvault.backend.entities.QrCode;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface QrCodeRepository extends JpaRepository<QrCode, Long> {
    Optional<QrCode> findByPatientProfileId(Long patientProfileId);
    Optional<QrCode> findByTokenAndStatus(String token, QrCode.QrStatus status);
}
