package com.example.LandmineSoft.repository;
import com.yourcompany.entity.PageVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PageVisitRepository extends JpaRepository<PageVisit, Long> {
    Optional<PageVisit> findByVisitDate(LocalDate date);
    List<PageVisit> findByVisitDateBetweenOrderByVisitDateAsc(LocalDate start, LocalDate end);
}
