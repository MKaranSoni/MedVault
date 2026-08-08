package com.medvault.backend.service;

import com.medvault.backend.dto.request.medical.*;
import java.util.List;

public interface MedicalRecordService {
    // Allergy
    AllergyDto addAllergy(String email, AllergyDto dto);
    List<AllergyDto> getAllergies(String email);
    void deleteAllergy(String email, Long id);

    // ChronicDisease
    ChronicDiseaseDto addDisease(String email, ChronicDiseaseDto dto);
    List<ChronicDiseaseDto> getDiseases(String email);
    void deleteDisease(String email, Long id);

    // Medication
    MedicationDto addMedication(String email, MedicationDto dto);
    List<MedicationDto> getMedications(String email);
    void deleteMedication(String email, Long id);

    // Surgery
    SurgeryDto addSurgery(String email, SurgeryDto dto);
    List<SurgeryDto> getSurgeries(String email);
    void deleteSurgery(String email, Long id);

    // Immunization
    ImmunizationDto addImmunization(String email, ImmunizationDto dto);
    List<ImmunizationDto> getImmunizations(String email);
    void deleteImmunization(String email, Long id);

    // FamilyHistory
    FamilyHistoryDto addFamilyHistory(String email, FamilyHistoryDto dto);
    List<FamilyHistoryDto> getFamilyHistories(String email);
    void deleteFamilyHistory(String email, Long id);
}
