package com.medvault.backend.service;

import com.medvault.backend.dto.request.EmergencyContactDto;
import com.medvault.backend.entities.EmergencyContact;
import com.medvault.backend.entities.PatientProfile;
import com.medvault.backend.exception.ResourceNotFoundException;
import com.medvault.backend.repository.EmergencyContactRepository;
import com.medvault.backend.repository.PatientProfileRepository;
import com.medvault.backend.util.EmergencyContactMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmergencyContactServiceImpl implements EmergencyContactService {

    private final EmergencyContactRepository contactRepository;
    private final PatientProfileRepository patientProfileRepository;

    private PatientProfile getPatientProfile(String email) {
        return patientProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found for email: " + email));
    }

    @Override
    @Transactional
    public EmergencyContactDto addContact(String email, EmergencyContactDto contactDto) {
        PatientProfile profile = getPatientProfile(email);

        if (contactRepository.existsByPatientProfileIdAndPhone(profile.getId(), contactDto.getPhone())) {
            throw new RuntimeException("Contact with this phone number already exists.");
        }

        EmergencyContact contact = EmergencyContactMapper.toEntity(contactDto);
        contact.setPatientProfile(profile);

        if (contact.getIsPrimary()) {
            resetOtherPrimaryContacts(profile.getId());
        }

        return EmergencyContactMapper.toDto(contactRepository.save(contact));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmergencyContactDto> getContacts(String email) {
        PatientProfile profile = getPatientProfile(email);
        return contactRepository.findByPatientProfileId(profile.getId()).stream()
                .map(EmergencyContactMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmergencyContactDto updateContact(String email, Long contactId, EmergencyContactDto contactDto) {
        PatientProfile profile = getPatientProfile(email);
        EmergencyContact contact = contactRepository.findByIdAndPatientProfileId(contactId, profile.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Emergency contact not found"));

        if (contactDto.getIsPrimary() != null && contactDto.getIsPrimary() && !contact.getIsPrimary()) {
            resetOtherPrimaryContacts(profile.getId());
        }

        EmergencyContactMapper.updateEntityFromDto(contactDto, contact);
        return EmergencyContactMapper.toDto(contactRepository.save(contact));
    }

    @Override
    @Transactional
    public void deleteContact(String email, Long contactId) {
        PatientProfile profile = getPatientProfile(email);
        EmergencyContact contact = contactRepository.findByIdAndPatientProfileId(contactId, profile.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Emergency contact not found"));
        contactRepository.delete(contact);
    }

    @Override
    @Transactional
    public void setPrimaryContact(String email, Long contactId) {
        PatientProfile profile = getPatientProfile(email);
        EmergencyContact contact = contactRepository.findByIdAndPatientProfileId(contactId, profile.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Emergency contact not found"));
        
        resetOtherPrimaryContacts(profile.getId());
        contact.setIsPrimary(true);
        contactRepository.save(contact);
    }

    private void resetOtherPrimaryContacts(Long patientProfileId) {
        List<EmergencyContact> contacts = contactRepository.findByPatientProfileId(patientProfileId);
        for (EmergencyContact c : contacts) {
            if (c.getIsPrimary()) {
                c.setIsPrimary(false);
                contactRepository.save(c);
            }
        }
    }
}
