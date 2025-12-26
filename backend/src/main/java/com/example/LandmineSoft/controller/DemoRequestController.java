package com.example.LandmineSoft.controller;


import com.example.LandmineSoft.entity.DemoRequest;
import com.example.LandmineSoft.repository.DemoRequestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/demo-requests")
// @CrossOrigin(origins = "http://localhost:5173")
        @CrossOrigin(origins="https://landminesoft.vercel.app")

public class DemoRequestController {

    private final DemoRequestRepository demoRequestRepository;

    public DemoRequestController(DemoRequestRepository demoRequestRepository) {
        this.demoRequestRepository = demoRequestRepository;
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody DemoRequest body) {
        DemoRequest d = new DemoRequest();
        d.setProductType(body.getProductType());
        d.setProductName(body.getProductName());
        d.setFullName(body.getFullName());
        d.setEmail(body.getEmail());
        d.setPhone(body.getPhone());
        d.setCreatedAt(LocalDateTime.now());
        demoRequestRepository.save(d);
        return ResponseEntity.ok("Demo request created with ID " + d.getId());
    }

    // For Admin tab later
    @GetMapping
    public List<DemoRequest> getAll() {
        return demoRequestRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!demoRequestRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        demoRequestRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

