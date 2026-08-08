package com.medvault.backend.service;

import com.medvault.backend.dto.response.dashboard.DoctorDashboardDto;

public interface EmergencyDashboardService {
    DoctorDashboardDto getEmergencyDashboard(String token);
}
