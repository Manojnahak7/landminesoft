// package com.example.LandmineSoft.service;

// import com.example.LandmineSoft.entity.User;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.stereotype.Service;

// @Service
// public class EmailService {

//     private final JavaMailSender mailSender;

//     @Value("${spring.mail.username:careers@landminesoft.com}")
//     private String fromEmail;

//     public EmailService(JavaMailSender mailSender) {
//         this.mailSender = mailSender;
//     }

// //    public void sendPasswordResetEmail(User user, String resetToken) {
// //        SimpleMailMessage message = new SimpleMailMessage();
// //        message.setFrom(fromEmail);
// //        message.setTo(user.getEmail());
// //        message.setSubject("🔒 Landmine Soft - Reset Your Password");
// //        message.setText("""
// //            Hi %s,
// //
// //            Click this link to reset your password:
// //            http://localhost:5173/auth/reset-password?token=%s
// //
// //            This link expires in 1 hour.
// //
// //            If you didn't request this, ignore this email.
// //
// //            Best,
// //            Landmine Soft Team
// //            """.formatted(user.getFullName(), resetToken));
// //
// //        mailSender.send(message);
// //    }

//     public void sendPasswordResetEmail(User user, String resetToken) {
//         SimpleMailMessage message = new SimpleMailMessage();
//         message.setFrom(fromEmail);
//         message.setTo(user.getEmail());
//         message.setSubject("🔒 Landmine Soft - Reset Your Password");

//         // 🔥 DYNAMIC FRONTEND URL
//         // String frontendUrl = "http://localhost:5173";
//         String frontendUrl="https://landminesoft.vercel.app";
//         String resetUrl = frontendUrl + "/auth?token=" + resetToken;

//         message.setText("""
//         Hi %s,
        
//         Click this link to reset your password:
//         %s
        
//         This link expires in 1 hour.
        
//         If you didn't request this, ignore this email.
        
//         Best,
//         Landmine Soft Team
//         """.formatted(user.getFullName(), resetUrl));

//         mailSender.send(message);
//     }


//     // 🔥 NEW: Job Application Confirmation Email
//     public void sendApplicationConfirmation(String fullName, String toEmail, String jobTitle) {
//         SimpleMailMessage message = new SimpleMailMessage();
//         message.setFrom(fromEmail);
//         message.setTo(toEmail);
//         message.setSubject("✅ Application Received - " + jobTitle);

//         String emailBody = """
//             Hello %s,
            
//             🎉 **You've successfully applied for the position of %s at Landmine Soft!**
            
//             📋 **What's Next?**
//             • We're currently reviewing all profiles
//             • If your profile matches this position, our recruiter will reach out within **3-5 business days**
//             • Keep an eye on your **inbox** (and **spam folder**) 
            
//             💡 **Pro Tip:** Make sure your resume has the right keywords from the job description!
            
//             👨‍💼 **Application Details:**
//             • Name: %s
//             • Email: %s
//             • Expected CTC: %s
            
//             📧 Questions? Reply to this email or contact careers@landminesoft.com
            
//             Best regards,
//             🚀 The Landmine Soft Team
//             careers@landminesoft.com
//             """.formatted(
//                 fullName,
//                 jobTitle,
//                 fullName,
//                 toEmail,
//                 "Expected Salary" // You can pass this too
//         );

//         message.setText(emailBody);
//         mailSender.send(message);
//     }



//     // ✅ YE GENERIC METHOD ADD KAR (sabhi emails ke liye)
//     public void sendEmail(String toEmail, String subject, String message) {
//         SimpleMailMessage mailMessage = new SimpleMailMessage();
//         mailMessage.setTo(toEmail);
//         mailMessage.setSubject(subject);
//         mailMessage.setText(message);
//         mailMessage.setFrom(fromEmail);

//         try {
//             mailSender.send(mailMessage);
//             System.out.println("✅ Email sent to: " + toEmail);
//         } catch (Exception e) {
//             System.err.println("❌ Email send failed: " + e.getMessage());
//         }
//     }

// }

package com.example.LandmineSoft.service;

import com.example.LandmineSoft.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    // @Value("${spring.mail.username:careers@landminesoft.com}")
     @Value("${spring.mail.username:landminesoft@gmail.com}")

    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(User user, String resetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(user.getEmail());
        message.setSubject("🔒 Landmine Soft - Reset Your Password");

        // 🔥 PRODUCTION URL
        String frontendUrl = "https://landminesoft.vercel.app";
        String resetUrl = frontendUrl + "/auth?token=" + resetToken + "&email=" + user.getEmail();

        message.setText("""
            Hi %s,
            
            Click this link to reset your password:
            %s
            
            ⏰ This link expires in 1 hour.
            
            If you didn't request this, safely ignore this email.
            
            Best regards,
            🚀 Landmine Soft Team
            careers@landminesoft.com
            """.formatted(user.getFullName(), resetUrl));

        // 🔥 FULL LOGGING + ERROR HANDLING
        try {
            System.out.println("🔥 Attempting PASSWORD RESET email to: " + user.getEmail());
            System.out.println("📧 From: " + fromEmail + " | To: " + user.getEmail());
            mailSender.send(message);
            System.out.println("✅ PASSWORD RESET EMAIL SUCCESS to: " + user.getEmail());
        } catch (Exception e) {
            System.err.println("❌ PASSWORD RESET EMAIL FAILED for " + user.getEmail());
            System.err.println("❌ ERROR: " + e.getMessage());
            System.err.println("❌ ERROR TYPE: " + e.getClass().getSimpleName());
            e.printStackTrace();
        }
    }

    public void sendApplicationConfirmation(String fullName, String toEmail, String jobTitle) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("✅ Application Received - " + jobTitle);

        String emailBody = """
            Hello %s,
            
            🎉 **You've successfully applied for the position of %s at Landmine Soft!**
            
            📋 **What's Next?**
            • We're reviewing all profiles
            • Recruiter will reach out within **3-5 business days**
            • Check your **inbox** (and **spam folder**) 
            
            💡 **Pro Tip:** Resume keywords match job description!
            
            👨‍💼 **Application Details:**
            • Name: %s
            • Email: %s
            • Position: %s
            
            📧 Questions? Reply to this email
            
            Best regards,
            🚀 Landmine Soft Team
            """.formatted(fullName, jobTitle, fullName, toEmail, jobTitle);

        message.setText(emailBody);

        // 🔥 FULL LOGGING
        try {
            System.out.println("🔥 Attempting APPLICATION CONFIRMATION to: " + toEmail);
            mailSender.send(message);
            System.out.println("✅ APPLICATION CONFIRMATION SUCCESS to: " + toEmail + " | Job: " + jobTitle);
        } catch (Exception e) {
            System.err.println("❌ APPLICATION CONFIRMATION FAILED for " + toEmail);
            System.err.println("❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendApplicationRejectionEmail(String fullName, String toEmail, String jobTitle) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("📧 Update on your " + jobTitle + " application");

        String emailBody = """
            Hello %s,
            
            Thank you for applying to %s at Landmine Soft.
            
            After careful consideration, we will not be moving forward with your application.
            
            We appreciate your interest and wish you success!
            
            Best regards,
            🚀 Landmine Soft Team
            """.formatted(fullName, jobTitle);

        message.setText(emailBody);

        try {
            System.out.println("🔥 Attempting REJECTION email to: " + toEmail);
            mailSender.send(message);
            System.out.println("✅ REJECTION EMAIL SUCCESS to: " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ REJECTION EMAIL FAILED for " + toEmail);
            System.err.println("❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Generic email method
    public void sendEmail(String toEmail, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailMessage.setFrom(fromEmail);

        try {
            System.out.println("🔥 Attempting GENERIC email to: " + toEmail);
            mailSender.send(mailMessage);
            System.out.println("✅ GENERIC EMAIL SUCCESS to: " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ GENERIC EMAIL FAILED for " + toEmail);
            System.err.println("❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

