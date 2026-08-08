package com.medvault.backend.util;

import com.medvault.backend.dto.request.medical.*;
import com.medvault.backend.entities.*;

public class MedicalRecordMapper {

    // Allergy
    public static AllergyDto toAllergyDto(Allergy entity) {
        if (entity == null) return null;
        return AllergyDto.builder()
                .id(entity.getId())
                .allergyType(entity.getAllergyType())
                .name(entity.getName())
                .severity(entity.getSeverity())
                .notes(entity.getNotes())
                .build();
    }

    public static Allergy toAllergyEntity(AllergyDto dto) {
        if (dto == null) return null;
        return Allergy.builder()
                .allergyType(dto.getAllergyType())
                .name(dto.getName())
                .severity(dto.getSeverity())
                .notes(dto.getNotes())
                .build();
    }

    // ChronicDisease
    public static ChronicDiseaseDto toDiseaseDto(ChronicDisease entity) {
        if (entity == null) return null;
        return ChronicDiseaseDto.builder()
                .id(entity.getId())
                .diseaseName(entity.getDiseaseName())
                .build();
    }

    public static ChronicDisease toDiseaseEntity(ChronicDiseaseDto dto) {
        if (dto == null) return null;
        return ChronicDisease.builder()
                .diseaseName(dto.getDiseaseName())
                .build();
    }

    // Medication
    public static MedicationDto toMedicationDto(Medication entity) {
        if (entity == null) return null;
        return MedicationDto.builder()
                .id(entity.getId())
                .medicineName(entity.getMedicineName())
                .dosage(entity.getDosage())
                .frequency(entity.getFrequency())
                .duration(entity.getDuration())
                .prescribingDoctor(entity.getPrescribingDoctor())
                .notes(entity.getNotes())
                .build();
    }

    public static Medication toMedicationEntity(MedicationDto dto) {
        if (dto == null) return null;
        return Medication.builder()
                .medicineName(dto.getMedicineName())
                .dosage(dto.getDosage())
                .frequency(dto.getFrequency())
                .duration(dto.getDuration())
                .prescribingDoctor(dto.getPrescribingDoctor())
                .notes(dto.getNotes())
                .build();
    }

    // Surgery
    public static SurgeryDto toSurgeryDto(Surgery entity) {
        if (entity == null) return null;
        return SurgeryDto.builder()
                .id(entity.getId())
                .surgeryName(entity.getSurgeryName())
                .hospital(entity.getHospital())
                .surgeryDate(entity.getSurgeryDate())
                .outcome(entity.getOutcome())
                .notes(entity.getNotes())
                .build();
    }

    public static Surgery toSurgeryEntity(SurgeryDto dto) {
        if (dto == null) return null;
        return Surgery.builder()
                .surgeryName(dto.getSurgeryName())
                .hospital(dto.getHospital())
                .surgeryDate(dto.getSurgeryDate())
                .outcome(dto.getOutcome())
                .notes(dto.getNotes())
                .build();
    }

    // Immunization
    public static ImmunizationDto toImmunizationDto(Immunization entity) {
        if (entity == null) return null;
        return ImmunizationDto.builder()
                .id(entity.getId())
                .vaccineName(entity.getVaccineName())
                .dateAdministered(entity.getDateAdministered())
                .boosterStatus(entity.getBoosterStatus())
                .build();
    }

    public static Immunization toImmunizationEntity(ImmunizationDto dto) {
        if (dto == null) return null;
        return Immunization.builder()
                .vaccineName(dto.getVaccineName())
                .dateAdministered(dto.getDateAdministered())
                .boosterStatus(dto.getBoosterStatus())
                .build();
    }

    // FamilyHistory
    public static FamilyHistoryDto toFamilyHistoryDto(FamilyHistory entity) {
        if (entity == null) return null;
        return FamilyHistoryDto.builder()
                .id(entity.getId())
                .relationship(entity.getRelationship())
                .medicalCondition(entity.getMedicalCondition())
                .notes(entity.getNotes())
                .build();
    }

    public static FamilyHistory toFamilyHistoryEntity(FamilyHistoryDto dto) {
        if (dto == null) return null;
        return FamilyHistory.builder()
                .relationship(dto.getRelationship())
                .medicalCondition(dto.getMedicalCondition())
                .notes(dto.getNotes())
                .build();
    }
}
