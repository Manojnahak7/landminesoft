package com.example.LandmineSoft.service;
import com.example.LandmineSoft.dto.ConsultationRequestDto;
import com.example.LandmineSoft.entity.ConsultationRequest;
import com.example.LandmineSoft.repository.ConsultationRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultationService {

    private final ConsultationRequestRepository repository;

    public ConsultationService(ConsultationRequestRepository repository) {
        this.repository = repository;
    }

    public ConsultationRequest createConsultation(ConsultationRequestDto dto) {
        ConsultationRequest entity = new ConsultationRequest();
        entity.setFullName(dto.getFullName());
        entity.setEmail(dto.getEmail());
        entity.setCompany(dto.getCompany());
        entity.setPhone(dto.getPhone());
        entity.setProjectType(dto.getProjectType());
        entity.setBudgetRange(dto.getBudgetRange());
        entity.setPreferredDate(dto.getPreferredDate());
        entity.setPreferredTime(dto.getPreferredTime());
        entity.setMeetingType(dto.getMeetingType());
        entity.setProjectSummary(dto.getProjectSummary());
        return repository.save(entity);   // JPA save entity[web:49][web:52]
    }
    // ConsultationService.java mein add karo
    public List<ConsultationRequest> getAllConsultations() {
        return repository.findAll();
    }

    public void deleteConsultation(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Consultation not found");
        }
        repository.deleteById(id);
    }

}

