package com.example.LandmineSoft.auth;

import com.example.LandmineSoft.dto.AuthResponse;
import com.example.LandmineSoft.dto.LoginRequest;
import com.example.LandmineSoft.dto.RegisterRequest;
import com.example.LandmineSoft.dto.UpdateUserRequest;
import com.example.LandmineSoft.entity.Job;
import com.example.LandmineSoft.entity.JobApplication;
import com.example.LandmineSoft.entity.User;
import com.example.LandmineSoft.repository.JobApplicationRepository;
import com.example.LandmineSoft.repository.JobRepository;
import com.example.LandmineSoft.repository.UserRepository;
import com.example.LandmineSoft.auth.AuthService;
import com.example.LandmineSoft.service.EmailService; // 🔥 NEW EMAIL
import com.example.LandmineSoft.service.JobApplicationService;
import com.example.LandmineSoft.service.ResumeService;
import org.springframework.core.io.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime; 
import com.example.LandmineSoft.repository.HiredApplicationRepository;
import com.example.LandmineSoft.entity.HiredApplication;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173","https://landminesoft.vercel.app" })
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private JobRepository jobRepository;
    private JobApplicationRepository jobApplicationRepository;
    private EmailService emailService; // 🔥 EMAIL SERVICE
    private JobApplicationService jobApplicationService;
    private final ResumeService resumeService;

    private HiredApplicationRepository hiredApplicationRepository;


    @Autowired
    public AuthController(AuthService authService, UserRepository userRepository,
                          JobRepository jobRepository, JobApplicationRepository jobApplicationRepository,
                          EmailService emailService,JobApplicationService jobApplicationService,ResumeService resumeService,HiredApplicationRepository hiredApplicationRepository) { // 🔥 EMAIL ADDED
        this.authService = authService;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.emailService = emailService; // 🔥 INITIALIZE
        this.jobApplicationService=jobApplicationService;
        this.resumeService=resumeService;
        this.hiredApplicationRepository = hiredApplicationRepository;
    }

    // ✅ REGISTER - WORKING!
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(authService.register(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Server error: " + e.getMessage()
            ));
        }
    }

    // ✅ LOGIN - WORKING!
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Server error: " + e.getMessage()
            ));
        }
    }

    // 🔥 JOB APPLY WITH EMAIL - NEW & WORKING!
    @PostMapping(value = "/jobs/apply", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> applyForJob(
            @RequestParam("jobId") Long jobId,
            @RequestParam("resume") MultipartFile resume,
            @RequestParam("email") String email,
            @RequestParam("fullName") String fullName,
            @RequestParam("phone") String phone,
            @RequestParam("location") String location,
            @RequestParam("collegeName") String collegeName,
            @RequestParam("city") String city,
            @RequestParam("cgpa") String cgpa,
            @RequestParam(value = "currentCompany", required = false) String currentCompany,
            @RequestParam(value = "currentSalary", required = false) String currentSalary,
            @RequestParam("expectedSalary") String expectedSalary) {

        try {
            // EMAIL-BASED AUTH
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found: " + email));

            // Check job exists
            Job job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));

            // Duplicate check
            if (jobApplicationRepository.existsByUserIdAndJobId(user.getId(), jobId)) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "✅ Already applied for this job"
                ));
            }

            // Resume validation
            if (resume.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false, "message", "❌ Resume required"
                ));
            }

            // File type check
            String contentType = resume.getContentType();
            if (!isValidResumeType(contentType)) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "❌ Only PDF/DOC/DOCX allowed"
                ));
            }

            // Save resume
//            String resumeFilename = saveResume(resume);
            String resumeUrl = resumeService.uploadResume(resume);

            // Create & Save application
            JobApplication application = new JobApplication();
            application.setUserId(user.getId());
            application.setJobId(jobId);
            application.setFullName(fullName);
            application.setEmail(email);
            application.setPhone(phone);
            application.setLocation(location);
            application.setCollegeName(collegeName);
            application.setCity(city);
            application.setCgpa(cgpa);
            application.setCurrentCompany(currentCompany);
            application.setCurrentSalary(currentSalary);
            application.setExpectedSalary(expectedSalary);
            application.setJobTitle(job.getTitle());
//            application.setResumePath(resumeFilename);
            application.setResumeUrl(resumeUrl);


            JobApplication saved = jobApplicationRepository.save(application);

            // 🔥 SEND CONFIRMATION EMAIL
            emailService.sendApplicationConfirmation(fullName, email, job.getTitle());

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "✅ Application submitted successfully! Check your email for confirmation.",
                    "applicationId", saved.getId(),
                    "jobTitle", job.getTitle()
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    // ✅ ALL OTHER METHODS (SAME AS OLD)
    private boolean isValidResumeType(String contentType) {
        return contentType != null && (
                contentType.equals("application/pdf") ||
                        contentType.equals("application/msword") ||
                        contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        );
    }

    private String saveResume(MultipartFile resume) throws IOException {
        String originalFilename = resume.getOriginalFilename();
        String fileExtension = originalFilename != null && originalFilename.contains(".") ?
                originalFilename.substring(originalFilename.lastIndexOf(".")) : ".pdf";
        String resumeFilename = "resume_" + UUID.randomUUID().toString() + fileExtension;

        Path uploadDir = Paths.get("uploads/resumes");
        Files.createDirectories(uploadDir);
        Path resumePath = uploadDir.resolve(resumeFilename);
        Files.copy(resume.getInputStream(), resumePath, StandardCopyOption.REPLACE_EXISTING);

        return "uploads/resumes/" + resumeFilename;
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<AuthResponse> updateProfile(
            @PathVariable Long userId, @Valid @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(authService.updateProfile(userId, request));
    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

    @DeleteMapping("/admin/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        authService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String email = request.get("email");
        try {
            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                return ResponseEntity.ok(Map.of(
                        "message", "If email exists, reset link sent!",
                        "success", true
                ));
            }

            // 🔥 DYNAMIC URL
            String frontendUrl = "http://localhost:3000";
            String host = httpRequest.getHeader("host");
            if (host != null && !host.contains("localhost") && !host.contains("127.")) {
                frontendUrl = httpRequest.getScheme() + "://" + host.split(":")[0];
            }

            String resetToken = UUID.randomUUID().toString();
            String resetUrl = frontendUrl + "/auth?token=" + resetToken + "&email=" + email;

            // 🔥 CORRECT METHOD CALL - requestPasswordReset(email, resetUrl)
            authService.requestPasswordReset(email, resetUrl);

            return ResponseEntity.ok(Map.of(
                    "message", "✅ Password reset link sent to " + email,
                    "success", true
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");
        try {
            authService.resetPassword(token, newPassword);
            return ResponseEntity.ok(Map.of(
                    "message", "✅ Password reset successfully! Please login.",
                    "success", true
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/admin/jobs")
    public ResponseEntity<?> createJob(@RequestBody Map<String, String> request) {
        Job job = new Job();
        job.setTitle(request.get("title"));
        job.setType(request.get("type"));
        job.setLocation(request.get("location"));
        job.setSummary(request.get("summary"));
        job.setExperience(request.get("experience"));
        job.setSalary(request.get("salary"));
        jobRepository.save(job);
        return ResponseEntity.ok(Map.of("message", "Job posted successfully!"));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam("email") String email) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs() {
        try {
            List<Job> jobs = jobRepository.findAll();
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }

    @GetMapping("/admin/applications")
    public ResponseEntity<List<JobApplication>> getAllApplications() {
        try {
            List<JobApplication> applications = jobApplicationRepository.findAll();
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }

    // @PutMapping("/admin/applications/{applicationId}/status")
    // public ResponseEntity<?> updateApplicationStatus(
    //         @PathVariable Long applicationId,
    //         @RequestBody Map<String, String> statusRequest) {
    //     try {
    //         String newStatus = statusRequest.get("status");
    //         if (newStatus == null || !Arrays.asList("PENDING", "IN_PROGRESS", "REJECTED", "SHORTLISTED").contains(newStatus)) {
    //             return ResponseEntity.badRequest()
    //                     .body(Map.of("error", "Invalid status. Use PENDING, IN_PROGRESS, REJECTED, SHORTLISTED"));
    //         }

    //         // ✅ JOBAPPLICATIONSERVICE USE KAR (email logic chalega)
    //         JobApplication application = jobApplicationService.updateStatus(applicationId, newStatus);

    //         return ResponseEntity.ok(Map.of(
    //                 "message", "Status updated successfully",
    //                 "applicationId", applicationId,
    //                 "newStatus", newStatus,
    //                 "success", true
    //         ));
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return ResponseEntity.internalServerError()
    //                 .body(Map.of("error", "Failed to update status: " + e.getMessage()));
    //     }
    // }

@PutMapping("/admin/applications/{applicationId}/status")
public ResponseEntity<?> updateApplicationStatus(
        @PathVariable Long applicationId,
        @RequestBody Map<String, String> statusRequest) {
    try {
        String newStatus = statusRequest.get("status").toUpperCase();
        JobApplication app = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if ("HIRED".equals(newStatus)) {
            HiredApplication hired = new HiredApplication();
            hired.setOriginalAppId(app.getId());
            hired.setFullName(app.getFullName());
            hired.setEmail(app.getEmail());
            hired.setPhone(app.getPhone());
            hired.setCgpa(app.getCgpa());
            hired.setJobTitle(app.getJobTitle());
            hired.setExpectedSalary(app.getExpectedSalary());
            hired.setHiredDate(LocalDateTime.now());
            hiredApplicationRepository.save(hired);
            jobApplicationRepository.delete(app);
            return ResponseEntity.ok(Map.of("success", true, "message", "✅ HIRED! Moved to Hired table."));
        } else if ("NO_RESPONSE".equals(newStatus)) {
            jobApplicationRepository.delete(app);
            return ResponseEntity.ok(Map.of("success", true, "message", "✅ NO_RESPONSE - Record deleted!"));
        } else if ("REJECTED".equals(newStatus)) {
            app.setStatus("REJECTED");
            jobApplicationRepository.save(app);
            return ResponseEntity.ok(Map.of("success", true, "message", "✅ REJECTED - Record retained!"));
        } else {
            // PENDING, IN_PROGRESS, SHORTLISTED
            app.setStatus(newStatus);
            jobApplicationRepository.save(app);
            return ResponseEntity.ok(Map.of("success", true, "newStatus", newStatus, "message", "✅ Status updated to " + newStatus));
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }
}



    @DeleteMapping("/admin/jobs/{jobId}")
    public ResponseEntity<?> deleteJob(@PathVariable Long jobId) {
        try {
            if (!jobRepository.existsById(jobId)) {
                return ResponseEntity.status(404).body(Map.of("error", "Job not found with id " + jobId));
            }
            jobRepository.deleteById(jobId);
            return ResponseEntity.ok(Map.of("message", "Job deleted successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/admin/jobs/{jobId}")
    public ResponseEntity<?> updateJob(@PathVariable Long jobId, @RequestBody Map<String, String> request) {
        try {
            Job job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));

            job.setTitle(request.get("title"));
            job.setType(request.get("type"));
            job.setLocation(request.get("location"));
            job.setSummary(request.get("summary"));
            job.setSalary(request.get("salary"));
            job.setExperience(request.get("experience"));

            jobRepository.save(job);
            return ResponseEntity.ok(Map.of("message", "Job updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/applications/user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getUserApplications(@PathVariable Long userId) {
        try {
            List<Object[]> results = jobApplicationRepository.findUserApplicationsSafe(userId);
            List<Map<String, Object>> apps = results.stream()
                    .map(row -> {
                        Map<String, Object> app = new HashMap<>();
                        app.put("id", row[0] != null ? ((Number)row[0]).longValue() : 0L);
                        app.put("userId", row[1] != null ? ((Number)row[1]).longValue() : 0L);
                        app.put("jobId", row[2] != null ? ((Number)row[2]).longValue() : 0L);
                        app.put("jobTitle", row[3] != null ? row[3].toString() : "N/A");
                        app.put("status", row[4] != null ? row[4].toString() : "PENDING");
                        app.put("appliedAt", row[5] != null ? row[5].toString() : "");
                        app.put("companyName", "Landmine Soft");
                        return app;
                    })
                    .collect(Collectors.toList());
            return ResponseEntity.ok(apps);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }
//    @GetMapping("/resume/download")
//    public ResponseEntity<?> downloadResume(
//            @RequestParam(value = "resumePath", required = false) String resumePath,
//            HttpServletRequest request) {
//
//        try {
//            // Extract original filename from path
//            String originalFilename = resumePath.split("/")[2]; // resume_9352e586...pdf
//            System.out.println("🔍 Original filename: " + originalFilename);
//
//            Path uploadDir = Paths.get("uploads/resumes");
//            Files.createDirectories(uploadDir);
//
//            Path filePath = uploadDir.resolve(originalFilename);
//
//            if (!Files.exists(filePath)) {
//                return ResponseEntity.ok(Map.of("error", "File not found: " + originalFilename));
//            }
//
//            Resource resource = new UrlResource(filePath.toUri());
//            return ResponseEntity.ok()
//                    .contentType(MediaType.APPLICATION_PDF)
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + originalFilename + "\"") // 🔥 Original name!
//                    .body(resource);
//
//        } catch (Exception e) {
//            return ResponseEntity.ok(Map.of("error", e.getMessage()));
//        }
//    }


    @GetMapping("/resume/download")
    public ResponseEntity<?> downloadResume(
            @RequestParam("resumeUrl") String resumeUrl) {
        if (resumeUrl == null || resumeUrl.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "resumeUrl is required"));
        }
        return ResponseEntity.status(HttpStatus.FOUND) // 302
                .header(HttpHeaders.LOCATION, resumeUrl)
                .build();
    }



    // ✅ YE ENDPOINT ADD KAR (Line ~400 ke baad, updateApplicationStatus ke niche)
    @DeleteMapping("/applications/{id}/reject")
    public ResponseEntity<?> rejectApplication(@PathVariable Long id) {
        try {
            JobApplication application = jobApplicationService.updateStatus(id, "REJECTED");
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Application rejected & email sent to " + application.getEmail(),
                    "application", application
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Failed to reject: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/admin/applications/hired")
public ResponseEntity<List<HiredApplication>> getHiredApplications() {
    return ResponseEntity.ok(hiredApplicationRepository.findAll());
}


   @GetMapping("/applications/user/{userId}/hired")
public ResponseEntity<List<JobApplication>> getUserHiredApplications(@PathVariable Long userId) {
  try {
    User user = userRepository.findById(userId).orElseThrow();
    List<HiredApplication> hired = hiredApplicationRepository.findByEmail(user.getEmail());
    List<JobApplication> mapped = hired.stream().map(ha -> {
      JobApplication app = new JobApplication();
      app.setId(ha.getOriginalAppId());
      app.setJobTitle(ha.getJobTitle());
      app.setStatus("HIRED");
      app.setFullName(ha.getFullName());
      app.setAppliedAt(ha.getHiredDate().toString());
      return app;
    }).collect(Collectors.toList());
    return ResponseEntity.ok(mapped);
  } catch (Exception e) {
    return ResponseEntity.status(500).body(Collections.emptyList());
  }
}




}
