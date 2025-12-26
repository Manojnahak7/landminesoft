package com.example.LandmineSoft.repository;

import com.example.LandmineSoft.entity.ConsultationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultationRequestRepository
        extends JpaRepository<ConsultationRequest, Long> {
}

