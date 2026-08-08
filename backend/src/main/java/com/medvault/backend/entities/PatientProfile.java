package com.medvault.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "patient_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String profilePictureUrl;
    
    @Column(length = 20)
    private String phone;
    
    private LocalDate dateOfBirth;
    
    @Column(length = 10)
    private String gender;
    
    @Column(length = 5)
    private String bloodGroup;
    
    private Double height; // in cm
    private Double weight; // in kg
    
    @OneToMany(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Allergy> allergies;
    
    @OneToMany(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChronicDisease> chronicDiseases;
    
    @OneToMany(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Medication> currentMedications;
    
    @OneToMany(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Surgery> previousSurgeries;

    @OneToMany(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Immunization> immunizations;

    @OneToMany(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FamilyHistory> familyHistories;
    
    private Boolean organDonorStatus;
    
    // Lifestyle Information
    @Column(length = 50)
    private String smokingStatus;
    
    @Column(length = 50)
    private String alcoholConsumption;
    
    @Column(length = 50)
    private String exerciseFrequency;
    
    @Column(columnDefinition = "TEXT")
    private String emergencyNotes;

    @Column(columnDefinition = "TEXT")
    private String specialInstructions;

    @OneToMany(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmergencyContact> emergencyContacts;

    @OneToMany(mappedBy = "patientProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MedicalReport> medicalReports;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
