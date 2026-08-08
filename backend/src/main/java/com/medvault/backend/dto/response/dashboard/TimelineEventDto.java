package com.medvault.backend.dto.response.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimelineEventDto {
    private LocalDate date;
    private String title;
    private String description;
    private String type; // e.g. SURGERY, IMMUNIZATION, HOSPITALIZATION
}
