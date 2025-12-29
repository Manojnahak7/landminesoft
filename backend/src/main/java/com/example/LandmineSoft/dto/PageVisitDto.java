package com.example.LandmineSoft.dto;

import com.example.LandmineSoft.entity.PageVisit;

public class PageVisitDto {
    public Long id;
    public String visitDate;
    public Integer count;

    public static PageVisitDto fromEntity(PageVisit entity) {
        PageVisitDto dto = new PageVisitDto();
        dto.id = entity.getId();
        dto.visitDate = entity.getVisitDate().toString();
        dto.count = entity.getCount();
        return dto;
    }
}
