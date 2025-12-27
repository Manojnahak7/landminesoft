// package com.example.LandmineSoft.service;

// import com.example.LandmineSoft.entity.JobApplication;
// import com.example.LandmineSoft.repository.JobApplicationRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;
// import org.springframework.web.multipart.MultipartFile;

// @Service
// @Transactional
// public class JobApplicationService {

//     private final JobApplicationRepository jobApplicationRepository;

//     @Autowired
//     private EmailService emailService;

//     public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
//         this.jobApplicationRepository = jobApplicationRepository;
//     }

//     public JobApplication saveApplication(JobApplication application) {
//         return jobApplicationRepository.save(application);
//     }

//     public boolean hasUserApplied(Long userId, Long jobId) {
//         return jobApplicationRepository.existsByUserIdAndJobId(userId, jobId);
//     }

//     // 🔥 NEW: Main apply method with email
//     public String applyForJob(String fullName, String email, String phone, String location,
//                               String collegeName, String city, String cgpa, String currentCompany,
//                               String currentSalary, String expectedSalary, Long jobId,
//                               MultipartFile resume) {

//         // Check if already applied (optional)
//         // if (hasUserApplied(userId, jobId)) {
//         //     return "You have already applied for this job!";
//         // }

//         // Create JobApplication entity (you'll need to map fields)
//         JobApplication application = new JobApplication();
//         application.setFullName(fullName);
//         application.setEmail(email);
//         application.setPhone(phone);
//         application.setLocation(location);
//         application.setCollegeName(collegeName);
//         application.setCity(city);
//         application.setCgpa(cgpa);
//         application.setCurrentCompany(currentCompany);
//         application.setCurrentSalary(currentSalary);
//         application.setExpectedSalary(expectedSalary);
//         application.setJobId(jobId);
//         // application.setResume(resume.getOriginalFilename()); // Save filename

//         // Save to database
//         saveApplication(application);

//         // 🔥 SEND CONFIRMATION EMAIL
//         emailService.sendApplicationConfirmation(fullName, email, "Job Title from DB"); // Pass job title

//         return "Application submitted successfully! Check your email for confirmation.";
//     }



//     public JobApplication updateStatus(Long id, String status) {
//         JobApplication application = jobApplicationRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Application not found"));

//         application.setStatus(status);
//         JobApplication saved = jobApplicationRepository.save(application);

//         // ✅ REJECTION EMAIL BHEJ
//         if ("REJECTED".equalsIgnoreCase(status)) {
//             sendRejectionEmail(application);
//         }

//         return saved;
//     }

//     // ✅ YE PRIVATE METHOD ADD KAR
//     private void sendRejectionEmail(JobApplication application) {
//         try {
//             String subject = "Update on your application for " + application.getJobTitle();
//             String message = """
//                 Hi %s,
                
//                 Thank you for applying for the %s position at LandmineSoft.
                
//                 After careful review, we regret to inform you that we have decided 
//                 to move forward with other candidates at this time.
                
//                 We truly appreciate your interest and the time you invested.
                
//                 Keep an eye on our careers page for future opportunities!
                
//                 Best regards,
//                 Hiring Team
//                 LandmineSoft
//                 """.formatted(application.getFullName(), application.getJobTitle());

//             emailService.sendEmail(application.getEmail(), subject, message);
//             System.out.println("✅ Rejection email sent to: " + application.getEmail());
//         } catch (Exception e) {
//             System.err.println("❌ Failed to send rejection email: " + e.getMessage());
//         }
//     }
// }



package com.example.LandmineSoft.service;

import com.example.LandmineSoft.entity.JobApplication;
import com.example.LandmineSoft.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    @Autowired
    private EmailService emailService;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public JobApplication saveApplication(JobApplication application) {
        return jobApplicationRepository.save(application);
    }

    public boolean hasUserApplied(Long userId, Long jobId) {
        return jobApplicationRepository.existsByUserIdAndJobId(userId, jobId);
    }

    // 🔥 Main apply method with email
    public String applyForJob(String fullName, String email, String phone, String location,
                              String collegeName, String city, String cgpa, String currentCompany,
                              String currentSalary, String expectedSalary, Long jobId,
                              MultipartFile resume) {

        JobApplication application = new JobApplication();
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
        application.setJobId(jobId);

        // Save to database
        saveApplication(application);

        // 🔥 SEND CONFIRMATION EMAIL
        // TODO: DB se actual job title nikal ke pass kar (abhi placeholder hai)
        emailService.sendApplicationConfirmation(fullName, email, "Job Title from DB");

        return "Application submitted successfully! Check your email for confirmation.";
    }

    public JobApplication updateStatus(Long id, String status) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status);
        JobApplication saved = jobApplicationRepository.save(application);

        // ✅ REJECTION EMAIL
        if ("REJECTED".equalsIgnoreCase(status)) {
            sendRejectionEmail(application);
        }

        return saved;
    }

    // ✅ PRIVATE METHOD: rejection via generic email
    private void sendRejectionEmail(JobApplication application) {
        try {
            String subject = "Update on your application for " + application.getJobTitle();
            String message = """
                    Hi %s,
                    
                    Thank you for applying for the %s position at LandmineSoft.
                    
                    After careful review, we regret to inform you that we have decided
                    to move forward with other candidates at this time.
                    
                    We truly appreciate your interest and the time you invested.
                    
                    Keep an eye on our careers page for future opportunities!
                    
                    Best regards,
                    Hiring Team
                    LandmineSoft
                    """.formatted(application.getFullName(), application.getJobTitle());

            emailService.sendEmail(application.getEmail(), subject, message);
            System.out.println("✅ Rejection email sent to: " + application.getEmail());
        } catch (Exception e) {
            System.err.println("❌ Failed to send rejection email: " + e.getMessage());
        }
    }
}
