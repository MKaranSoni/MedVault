package com.medvault.backend.service;

import com.medvault.backend.dto.request.medical.*;
import com.medvault.backend.entities.*;
import com.medvault.backend.exception.ResourceNotFoundException;
import com.medvault.backend.repository.*;
import com.medvault.backend.util.MedicalRecordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalRecordServiceImpl implements MedicalRecordService {

    private final PatientProfileRepository patientProfileRepository;
    private final AllergyRepository allergyRepository;
    private final ChronicDiseaseRepository diseaseRepository;
    private final MedicationRepository medicationRepository;
    private final SurgeryRepository surgeryRepository;
    private final ImmunizationRepository immunizationRepository;
    private final FamilyHistoryRepository familyHistoryRepository;

    private PatientProfile getPatientProfile(String email) {
        return patientProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
    }

    @Override
    @Transactional
    public AllergyDto addAllergy(String email, AllergyDto dto) {
        PatientProfile profile = getPatientProfile(email);
        Allergy entity = MedicalRecordMapper.toAllergyEntity(dto);
        entity.setPatientProfile(profile);
        return MedicalRecordMapper.toAllergyDto(allergyRepository.save(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AllergyDto> getAllergies(String email) {
        return allergyRepository.findByPatientProfileId(getPatientProfile(email).getId())
                .stream().map(MedicalRecordMapper::toAllergyDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteAllergy(String email, Long id) {
        Allergy entity = allergyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found"));
        allergyRepository.delete(entity);
    }

    @Override
    @Transactional
    public ChronicDiseaseDto addDisease(String email, ChronicDiseaseDto dto) {
        PatientProfile profile = getPatientProfile(email);
        ChronicDisease entity = MedicalRecordMapper.toDiseaseEntity(dto);
        entity.setPatientProfile(profile);
        return MedicalRecordMapper.toDiseaseDto(diseaseRepository.save(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChronicDiseaseDto> getDiseases(String email) {
        return diseaseRepository.findByPatientProfileId(getPatientProfile(email).getId())
                .stream().map(MedicalRecordMapper::toDiseaseDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteDisease(String email, Long id) {
        diseaseRepository.deleteById(id);
    }

    @Override
    @Transactional
    public MedicationDto addMedication(String email, MedicationDto dto) {
        PatientProfile profile = getPatientProfile(email);
        Medication entity = MedicalRecordMapper.toMedicationEntity(dto);
        entity.setPatientProfile(profile);
        return MedicalRecordMapper.toMedicationDto(medicationRepository.save(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicationDto> getMedications(String email) {
        return medicationRepository.findByPatientProfileId(getPatientProfile(email).getId())
                .stream().map(MedicalRecordMapper::toMedicationDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteMedication(String email, Long id) {
        medicationRepository.deleteById(id);
    }

    @Override
    @Transactional
    public SurgeryDto addSurgery(String email, SurgeryDto dto) {
        PatientProfile profile = getPatientProfile(email);
        Surgery entity = MedicalRecordMapper.toSurgeryEntity(dto);
        entity.setPatientProfile(profile);
        return MedicalRecordMapper.toSurgeryDto(surgeryRepository.save(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public List<SurgeryDto> getSurgeries(String email) {
        return surgeryRepository.findByPatientProfileId(getPatientProfile(email).getId())
                .stream().map(MedicalRecordMapper::toSurgeryDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteSurgery(String email, Long id) {
        surgeryRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ImmunizationDto addImmunization(String email, ImmunizationDto dto) {
        PatientProfile profile = getPatientProfile(email);
        Immunization entity = MedicalRecordMapper.toImmunizationEntity(dto);
        entity.setPatientProfile(profile);
        return MedicalRecordMapper.toImmunizationDto(immunizationRepository.save(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ImmunizationDto> getImmunizations(String email) {
        return immunizationRepository.findByPatientProfileId(getPatientProfile(email).getId())
                .stream().map(MedicalRecordMapper::toImmunizationDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteImmunization(String email, Long id) {
        immunizationRepository.deleteById(id);
    }

    @Override
    @Transactional
    public FamilyHistoryDto addFamilyHistory(String email, FamilyHistoryDto dto) {
        PatientProfile profile = getPatientProfile(email);
        FamilyHistory entity = MedicalRecordMapper.toFamilyHistoryEntity(dto);
        entity.setPatientProfile(profile);
        return MedicalRecordMapper.toFamilyHistoryDto(familyHistoryRepository.save(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public List<FamilyHistoryDto> getFamilyHistories(String email) {
        return familyHistoryRepository.findByPatientProfileId(getPatientProfile(email).getId())
                .stream().map(MedicalRecordMapper::toFamilyHistoryDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteFamilyHistory(String email, Long id) {
        familyHistoryRepository.deleteById(id);
    }
}
