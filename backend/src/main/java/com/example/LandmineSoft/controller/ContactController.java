package com.example.LandmineSoft.controller;
import com.example.LandmineSoft.entity.ContactMessage;
import com.example.LandmineSoft.repository.ContactMessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
@RestController
@RequestMapping("/api/contact")
// @CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins="https://landminesoft.vercel.app")

public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    public ContactController(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public static class ContactRequest {
        public String name;
        public String email;
        public String subject;
        public String message;
    }

    // CONTACT FORM SE SAVE
    @PostMapping
    public ResponseEntity<String> handleContact(@RequestBody ContactRequest req) {
        ContactMessage cm = new ContactMessage();
        cm.setName(req.name);
        cm.setEmail(req.email);
        cm.setSubject(req.subject);
        cm.setMessage(req.message);
        cm.setCreatedAt(LocalDateTime.now());

        contactMessageRepository.save(cm);

        System.out.println("CONTACT MESSAGE FROM UI SAVED, ID = " + cm.getId());

        return ResponseEntity.ok("Message received");
    }

    // 🔹 ADMIN: SAARE CONTACTS LIST
    @GetMapping("/all")
    public ResponseEntity<List<ContactMessage>> getAllContacts() {
        List<ContactMessage> all = contactMessageRepository.findAll();
        return ResponseEntity.ok(all);
    }

    // 🔹 ADMIN: SINGLE CONTACT DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        if (!contactMessageRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        contactMessageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
