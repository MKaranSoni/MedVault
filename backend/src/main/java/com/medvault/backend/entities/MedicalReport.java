package com.medvault.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_profile_id", nullable = false)
    private PatientProfile patientProfile;

    @Column(nullable = false, length = 150)
    private String reportTitle;

    @Column(nullable = false, length = 100)
    private String reportType; // Prescription, Blood Report, etc.

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 150)
    private String hospitalName;

    @Column(length = 150)
    private String doctorName;

    private LocalDate reportDate;

    @Column(nullable = false)
    private String cloudinaryUrl;

    @Column(nullable = false)
    private String publicId;

    private Long fileSize;

    @Column(length = 20)
    private String fileFormat;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
