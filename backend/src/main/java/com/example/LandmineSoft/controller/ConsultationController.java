package com.example.LandmineSoft.controller;
import com.example.LandmineSoft.dto.ConsultationRequestDto;
import com.example.LandmineSoft.entity.ConsultationRequest;
import com.example.LandmineSoft.service.ConsultationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = "http://localhost:5173")
public class ConsultationController {

    private final ConsultationService service;

    public ConsultationController(ConsultationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ConsultationRequest> createConsultation(
            @RequestBody ConsultationRequestDto dto) {
        ConsultationRequest saved = service.createConsultation(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    // GET ALL consultations
    @GetMapping
    public ResponseEntity<List<ConsultationRequest>> getAllConsultations() {
        List<ConsultationRequest> consultations = service.getAllConsultations();
        return ResponseEntity.ok(consultations);
    }

    // DELETE consultation by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable Long id) {
        service.deleteConsultation(id);
        return ResponseEntity.noContent().build();
    }
}

