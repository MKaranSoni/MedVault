package com.medvault.backend.service;

import com.medvault.backend.dto.response.dashboard.IceProfileDto;

public interface IceService {
    IceProfileDto getIceProfile(String token);
}
