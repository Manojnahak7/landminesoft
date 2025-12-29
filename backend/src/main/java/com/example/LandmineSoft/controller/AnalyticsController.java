package com.example.LandmineSoft.controller;
import com.yourcompany.dto.PageVisitDto;
import com.yourcompany.entity.PageVisit;
import com.yourcompany.repository.PageVisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private PageVisitRepository repo;

    @PostMapping("/track-visit")
    public ResponseEntity<Void> trackVisit() {
        LocalDate today = LocalDate.now();
        PageVisit visit = repo.findByVisitDate(today)
                .orElseGet(() -> new PageVisit(today, 0));
        visit.setCount(visit.getCount() + 1);
        repo.save(visit);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/visits")
    public List<PageVisitDto> getVisits(
            @RequestParam int year,
            @RequestParam int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        return repo.findByVisitDateBetweenOrderByVisitDateAsc(start, end)
                .stream()
                .map(PageVisitDto::fromEntity)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/visits/{id}")
    public ResponseEntity<String> deleteVisit(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Record not found");
        }
        repo.deleteById(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
