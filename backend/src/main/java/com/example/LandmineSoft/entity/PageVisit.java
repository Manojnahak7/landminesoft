package com.example.LandmineSoft.entity;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "page_visits")
public class PageVisit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private LocalDate visitDate;
    
    @Column(nullable = false)
    private Integer count = 0;

    public PageVisit() {}

    public PageVisit(LocalDate visitDate, Integer count) {
        this.visitDate = visitDate;
        this.count = count;
    }

    // Getters Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public LocalDate getVisitDate() { return visitDate; }
    public void setVisitDate(LocalDate visitDate) { this.visitDate = visitDate; }
    
    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }
}
