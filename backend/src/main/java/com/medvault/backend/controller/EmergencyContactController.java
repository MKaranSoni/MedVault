package com.medvault.backend.controller;

import com.medvault.backend.dto.request.EmergencyContactDto;
import com.medvault.backend.dto.response.ApiResponse;
import com.medvault.backend.service.EmergencyContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patient/emergency-contacts")
@RequiredArgsConstructor
public class EmergencyContactController {

    private final EmergencyContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponse<EmergencyContactDto>> addContact(
            Authentication authentication,
            @Valid @RequestBody EmergencyContactDto contactDto) {
        EmergencyContactDto created = contactService.addContact(authentication.getName(), contactDto);
        return new ResponseEntity<>(
                ApiResponse.<EmergencyContactDto>builder().success(true).message("Contact added").data(created).build(),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EmergencyContactDto>>> getContacts(Authentication authentication) {
        List<EmergencyContactDto> contacts = contactService.getContacts(authentication.getName());
        return ResponseEntity.ok(
                ApiResponse.<List<EmergencyContactDto>>builder().success(true).message("Contacts fetched").data(contacts).build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmergencyContactDto>> updateContact(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody EmergencyContactDto contactDto) {
        EmergencyContactDto updated = contactService.updateContact(authentication.getName(), id, contactDto);
        return ResponseEntity.ok(
                ApiResponse.<EmergencyContactDto>builder().success(true).message("Contact updated").data(updated).build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteContact(
            Authentication authentication,
            @PathVariable Long id) {
        contactService.deleteContact(authentication.getName(), id);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder().success(true).message("Contact deleted").build()
        );
    }

    @PatchMapping("/{id}/primary")
    public ResponseEntity<ApiResponse<Void>> setPrimaryContact(
            Authentication authentication,
            @PathVariable Long id) {
        contactService.setPrimaryContact(authentication.getName(), id);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder().success(true).message("Primary contact set").build()
        );
    }
}
