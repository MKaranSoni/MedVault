package com.medvault.backend.service;

import com.medvault.backend.dto.request.PatientProfileDto;
import com.medvault.backend.entities.PatientProfile;
import com.medvault.backend.entities.User;
import com.medvault.backend.exception.ResourceNotFoundException;
import com.medvault.backend.repository.PatientProfileRepository;
import com.medvault.backend.repository.UserRepository;
import com.medvault.backend.util.PatientProfileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PatientProfileServiceImpl implements PatientProfileService {

    private final PatientProfileRepository patientProfileRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public PatientProfileDto getProfileByEmail(String email) {
        PatientProfile profile = patientProfileRepository.findByUserEmail(email)
                .orElseGet(() -> createEmptyProfileForUser(email));
        return PatientProfileMapper.toDto(profile);
    }

    @Override
    @Transactional
    public PatientProfileDto updateProfile(String email, PatientProfileDto profileDto) {
        PatientProfile profile = patientProfileRepository.findByUserEmail(email)
                .orElseGet(() -> createEmptyProfileForUser(email));
        
        PatientProfileMapper.updateEntityFromDto(profileDto, profile);
        profile = patientProfileRepository.save(profile);
        
        return PatientProfileMapper.toDto(profile);
    }

    private PatientProfile createEmptyProfileForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        
        PatientProfile newProfile = PatientProfile.builder()
                .user(user)
                .build();
        return patientProfileRepository.save(newProfile);
    }
}
