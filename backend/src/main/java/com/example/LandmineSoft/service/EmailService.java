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
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private final WebClient resendClient;
    private final String fromEmail;

    public EmailService(
            @Value("${RESEND_API_KEY}") String resendApiKey
    ) {
        this.resendClient = WebClient.builder()
                .baseUrl("https://api.resend.com")
                .defaultHeader("Authorization", "Bearer " + resendApiKey)
                .build();

        // From email (Resend में allow हो ऐसा रखना)
        // this.fromEmail = "Landmine Soft <no-reply@landminesoft.com>";
            this.fromEmail = "Landmine Soft <onboarding@resend.dev>";

    }

    // ✅ PASSWORD RESET EMAIL
    public void sendPasswordResetEmail(User user, String resetToken) {
        String frontendUrl = "https://landminesoft.vercel.app";
        String resetUrl = frontendUrl + "/auth?token=" + resetToken + "&email=" + user.getEmail();

        String textBody = """
                Hi %s,

                Click this link to reset your password:
                %s

                This link expires in 1 hour.

                If you didn't request this, safely ignore this email.

                Best regards,
                Landmine Soft Team
                """.formatted(user.getFullName(), resetUrl);

        System.out.println("🔥 Attempting PASSWORD RESET email to: " + user.getEmail());
        sendViaResend(
                user.getEmail(),
                "🔒 Landmine Soft - Reset Your Password",
                textBody
        );
    }

    // ✅ JOB APPLICATION CONFIRMATION
    public void sendApplicationConfirmation(String fullName, String toEmail, String jobTitle) {
        String textBody = """
                Hello %s,

                You've successfully applied for the position of %s at Landmine Soft!

                What's next?
                • We're reviewing all profiles
                • Our team will reach out within 3–5 business days
                • Keep an eye on your inbox (and spam folder)

                Application Details:
                • Name: %s
                • Email: %s
                • Position: %s

                Best regards,
                Landmine Soft Team
                """.formatted(fullName, jobTitle, fullName, toEmail, jobTitle);

        System.out.println("🔥 Attempting APPLICATION CONFIRMATION to: " + toEmail);
        sendViaResend(
                toEmail,
                "✅ Application Received - " + jobTitle,
                textBody
        );
    }

    // ✅ APPLICATION REJECTION (direct method भी रख रहे हैं)
    public void sendApplicationRejectionEmail(String fullName, String toEmail, String jobTitle) {
        String textBody = """
                Hello %s,

                Thank you for applying for the %s position at Landmine Soft.

                After careful consideration, we will not be moving forward with your application.

                We truly appreciate your interest and wish you success in your career.

                Best regards,
                Landmine Soft Team
                """.formatted(fullName, jobTitle);

        System.out.println("🔥 Attempting REJECTION email to: " + toEmail);
        sendViaResend(
                toEmail,
                "📧 Update on your " + jobTitle + " application",
                textBody
        );
    }

    // ✅ GENERIC EMAIL (JobApplicationService वाला भी इसी का use कर रहा है)
    public void sendEmail(String toEmail, String subject, String message) {
        System.out.println("🔥 Attempting GENERIC email to: " + toEmail);
        sendViaResend(toEmail, subject, message);
    }

    // ✅ COMMON RESEND CALL
    private void sendViaResend(String to, String subject, String textBody) {
        try {
            resendClient.post()
                    .uri("/emails")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(Map.of(
                            "from", fromEmail,
                            "to", List.of(to),
                            "subject", subject,
                            "text", textBody
                    ))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .doOnError(err ->
                            System.err.println("❌ RESEND EMAIL FAILED: " + err.getMessage())
                    )
                    .block(); // simple sync; बाद में async कर सकते हो

            System.out.println("✅ RESEND EMAIL SUCCESS to: " + to);
        } catch (Exception e) {
            System.err.println("❌ RESEND EMAIL EXCEPTION for " + to + ": " + e.getMessage());
        }
    }
}
