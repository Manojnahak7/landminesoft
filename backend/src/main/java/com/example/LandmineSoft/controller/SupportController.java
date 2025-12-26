package com.example.LandmineSoft.controller;


import com.example.LandmineSoft.entity.SupportTicket;
import com.example.LandmineSoft.repository.SupportTicketRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/support")
// @CrossOrigin(origins = "http://localhost:5173") // apna frontend origin
            @CrossOrigin(origins="https://landminesoft.vercel.app")

public class SupportController {

    private final SupportTicketRepository supportTicketRepository;

    public SupportController(SupportTicketRepository supportTicketRepository) {
        this.supportTicketRepository = supportTicketRepository;
    }

    public static class SupportRequest {
        public String email;
        public String category;
        public String subject;
        public String description;
    }

    // User creates ticket
    @PostMapping("/tickets")
    public ResponseEntity<String> createTicket(@RequestBody SupportRequest req) {
        SupportTicket t = new SupportTicket();
        t.setEmail(req.email);
        t.setCategory(req.category);
        t.setSubject(req.subject);
        t.setDescription(req.description);
        t.setStatus("OPEN");
        t.setCreatedAt(LocalDateTime.now());

        supportTicketRepository.save(t);

        return ResponseEntity.ok("Support ticket created with ID " + t.getId());
    }

    // Admin list all tickets (for future Admin tab)
    @GetMapping("/tickets")
    public ResponseEntity<List<SupportTicket>> getAllTickets() {
        return ResponseEntity.ok(supportTicketRepository.findAll());
    }

    // Admin close / update ticket status (optional)
    @PutMapping("/tickets/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return supportTicketRepository
                .findById(id)
                .map(t -> {
                    t.setStatus(status);
                    supportTicketRepository.save(t);
                    return ResponseEntity.noContent().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Admin delete ticket (optional)
    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        if (!supportTicketRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        supportTicketRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

