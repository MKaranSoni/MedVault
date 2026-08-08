package com.medvault.backend.constants;

public class AppConstants {
    public static final String API_V1_PREFIX = "/api/v1";
    public static final String ROLE_PATIENT = "ROLE_PATIENT";
    public static final String ROLE_DOCTOR = "ROLE_DOCTOR";
    public static final String[] PUBLIC_URLS = {
        "/api/v1/auth/**",
        "/swagger-ui/**",
        "/v3/api-docs/**"
    };
}
