package com.medvault.backend.util;

import com.medvault.backend.dto.request.PatientProfileDto;
import com.medvault.backend.entities.PatientProfile;

public class PatientProfileMapper {

    public static PatientProfileDto toDto(PatientProfile entity) {
        if (entity == null) return null;
        return PatientProfileDto.builder()
                .profilePictureUrl(entity.getProfilePictureUrl())
                .phone(entity.getPhone())
                .dateOfBirth(entity.getDateOfBirth())
                .gender(entity.getGender())
                .bloodGroup(entity.getBloodGroup())
                .height(entity.getHeight())
                .weight(entity.getWeight())
                .organDonorStatus(entity.getOrganDonorStatus())
                .smokingStatus(entity.getSmokingStatus())
                .alcoholConsumption(entity.getAlcoholConsumption())
                .exerciseFrequency(entity.getExerciseFrequency())
                .emergencyNotes(entity.getEmergencyNotes())
                .specialInstructions(entity.getSpecialInstructions())
                .build();
    }

    public static void updateEntityFromDto(PatientProfileDto dto, PatientProfile entity) {
        if (dto == null) return;
        if (dto.getProfilePictureUrl() != null) entity.setProfilePictureUrl(dto.getProfilePictureUrl());
        if (dto.getPhone() != null) entity.setPhone(dto.getPhone());
        if (dto.getDateOfBirth() != null) entity.setDateOfBirth(dto.getDateOfBirth());
        if (dto.getGender() != null) entity.setGender(dto.getGender());
        if (dto.getBloodGroup() != null) entity.setBloodGroup(dto.getBloodGroup());
        if (dto.getHeight() != null) entity.setHeight(dto.getHeight());
        if (dto.getWeight() != null) entity.setWeight(dto.getWeight());
        if (dto.getOrganDonorStatus() != null) entity.setOrganDonorStatus(dto.getOrganDonorStatus());
        if (dto.getSmokingStatus() != null) entity.setSmokingStatus(dto.getSmokingStatus());
        if (dto.getAlcoholConsumption() != null) entity.setAlcoholConsumption(dto.getAlcoholConsumption());
        if (dto.getExerciseFrequency() != null) entity.setExerciseFrequency(dto.getExerciseFrequency());
        if (dto.getEmergencyNotes() != null) entity.setEmergencyNotes(dto.getEmergencyNotes());
        if (dto.getSpecialInstructions() != null) entity.setSpecialInstructions(dto.getSpecialInstructions());
    }
}
