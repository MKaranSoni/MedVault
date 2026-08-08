package com.medvault.backend.service;

import com.medvault.backend.dto.request.EmergencyContactDto;
import java.util.List;

public interface EmergencyContactService {
    EmergencyContactDto addContact(String email, EmergencyContactDto contactDto);
    List<EmergencyContactDto> getContacts(String email);
    EmergencyContactDto updateContact(String email, Long contactId, EmergencyContactDto contactDto);
    void deleteContact(String email, Long contactId);
    void setPrimaryContact(String email, Long contactId);
}
