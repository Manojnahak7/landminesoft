package com.example.LandmineSoft.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hired_applications")
public class HiredApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Reference to job_applications.id
    @Column(nullable = false)
    private Long originalAppId;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    private String phone;
    private String cgpa;
    private String jobTitle;
    private String expectedSalary;

    @Column(nullable = false)
    private LocalDateTime hiredDate;

    // ✅ No-args constructor (MANDATORY for JPA)
    public HiredApplication() {
        this.hiredDate = LocalDateTime.now();
    }

    // ✅ All-args constructor (optional but useful)
    public HiredApplication(Long id, Long originalAppId, String fullName, String email,
                            String phone, String cgpa, String jobTitle,
                            String expectedSalary, LocalDateTime hiredDate) {
        this.id = id;
        this.originalAppId = originalAppId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.cgpa = cgpa;
        this.jobTitle = jobTitle;
        this.expectedSalary = expectedSalary;
        this.hiredDate = hiredDate;
    }

    // ✅ Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOriginalAppId() {
        return originalAppId;
    }

    public void setOriginalAppId(Long originalAppId) {
        this.originalAppId = originalAppId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCgpa() {
        return cgpa;
    }

    public void setCgpa(String cgpa) {
        this.cgpa = cgpa;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getExpectedSalary() {
        return expectedSalary;
    }

    public void setExpectedSalary(String expectedSalary) {
        this.expectedSalary = expectedSalary;
    }

    public LocalDateTime getHiredDate() {
        return hiredDate;
    }

    public void setHiredDate(LocalDateTime hiredDate) {
        this.hiredDate = hiredDate;
    }

    // ✅ toString (Debugging ke liye helpful)
    @Override
    public String toString() {
        return "HiredApplication{" +
                "id=" + id +
                ", originalAppId=" + originalAppId +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", cgpa='" + cgpa + '\'' +
                ", jobTitle='" + jobTitle + '\'' +
                ", expectedSalary='" + expectedSalary + '\'' +
                ", hiredDate=" + hiredDate +
                '}';
    }
}
