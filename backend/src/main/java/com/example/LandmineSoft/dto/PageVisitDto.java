package com.example.LandmineSoft.dto;

import java.time.LocalDate;

public class PageVisitDto {
    public Long id;
    public String visitDate; // "2025-12-30" format
    public Integer count;

    public static PageVisitDto fromEntity(PageVisit entity) {
        PageVisitDto dto = new PageVisitDto();
        dto.id = entity.getId();
        dto.visitDate = entity.getVisitDate().toString();
        dto.count = entity.getCount();
        return dto;
    }
}
