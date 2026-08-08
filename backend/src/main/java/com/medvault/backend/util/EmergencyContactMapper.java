package com.medvault.backend.util;

import com.medvault.backend.dto.request.EmergencyContactDto;
import com.medvault.backend.entities.EmergencyContact;

public class EmergencyContactMapper {

    public static EmergencyContactDto toDto(EmergencyContact entity) {
        if (entity == null) return null;
        return EmergencyContactDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .relationship(entity.getRelationship())
                .phone(entity.getPhone())
                .alternatePhone(entity.getAlternatePhone())
                .isPrimary(entity.getIsPrimary())
                .build();
    }

    public static EmergencyContact toEntity(EmergencyContactDto dto) {
        if (dto == null) return null;
        return EmergencyContact.builder()
                .name(dto.getName())
                .relationship(dto.getRelationship())
                .phone(dto.getPhone())
                .alternatePhone(dto.getAlternatePhone())
                .isPrimary(dto.getIsPrimary() != null ? dto.getIsPrimary() : false)
                .build();
    }

    public static void updateEntityFromDto(EmergencyContactDto dto, EmergencyContact entity) {
        if (dto == null) return;
        if (dto.getName() != null) entity.setName(dto.getName());
        if (dto.getRelationship() != null) entity.setRelationship(dto.getRelationship());
        if (dto.getPhone() != null) entity.setPhone(dto.getPhone());
        if (dto.getAlternatePhone() != null) entity.setAlternatePhone(dto.getAlternatePhone());
        if (dto.getIsPrimary() != null) entity.setIsPrimary(dto.getIsPrimary());
    }
}
