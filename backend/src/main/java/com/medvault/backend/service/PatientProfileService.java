package com.medvault.backend.service;

import com.medvault.backend.dto.request.PatientProfileDto;

public interface PatientProfileService {
    PatientProfileDto getProfileByEmail(String email);
    PatientProfileDto updateProfile(String email, PatientProfileDto profileDto);
}
