package com.example.LandmineSoft.auth;
import com.example.LandmineSoft.dto.AuthResponse;
import com.example.LandmineSoft.dto.LoginRequest;
import com.example.LandmineSoft.dto.RegisterRequest;
import com.example.LandmineSoft.dto.UpdateUserRequest;
import com.example.LandmineSoft.entity.User;
import com.example.LandmineSoft.repository.UserRepository;
import com.example.LandmineSoft.service.EmailService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        System.out.println("🔍 Register attempt for: " + request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            System.out.println("❌ Email already exists: " + request.getEmail());
            throw new IllegalArgumentException("Email already in use");
        }

        String hash = passwordEncoder.encode(request.getPassword());
        System.out.println("🔐 Password hashed for: " + request.getEmail());

        User user = new User();
        user.setFullName(request.getFullName());
        user.setLocation(request.getLocation());
        user.setCity(request.getCity());
        user.setPincode(request.getPincode());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setPasswordHash(hash);
        user.setCollegeName(request.getCollegeName());
        user.setDegree(request.getDegree());
        user.setYearOfPassing(request.getYearOfPassing());
        user.setCgpa(request.getCgpa());
        user.setCurrentCompany(request.getCurrentCompany());
        user.setCurrentPosition(request.getCurrentPosition());
        user.setCurrentSalary(request.getCurrentSalary());
        user.setRole("USER");

        User saved = userRepository.save(user);
        System.out.println("✅ User registered: ID=" + saved.getId() + ", Email=" + saved.getEmail());

        return new AuthResponse(
                saved.getId(),
                saved.getFullName(),
                saved.getEmail(),
                saved.getLocation(),
                saved.getCity(),
                saved.getPincode(),
                saved.getPhone(),
                saved.getCollegeName(),
                saved.getDegree(),
                saved.getYearOfPassing(),
                saved.getCgpa(),
                saved.getCurrentCompany(),
                saved.getCurrentPosition(),
                saved.getCurrentSalary(),
                saved.getRole(),
                "User registered successfully"
        );
    }

    public AuthResponse login(LoginRequest request) {
        System.out.println("🔍 Login attempt for: " + request.getEmail());

        var userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            System.out.println("❌ User NOT FOUND: " + request.getEmail());
            throw new IllegalArgumentException("Invalid email or password");
        }

        User user = userOpt.get();
        System.out.println("✅ User FOUND: " + user.getEmail() + ", ID: " + user.getId());

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash()
        );

        if (!matches) {
            System.out.println("❌ PASSWORD MISMATCH for: " + user.getEmail());
            throw new IllegalArgumentException("Invalid email or password");
        }

        System.out.println("🎉 LOGIN SUCCESS: " + user.getEmail() + " (Role: " + user.getRole() + ")");

        return new AuthResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getLocation(),
                user.getCity(),
                user.getPincode(),
                user.getPhone(),
                user.getCollegeName(),
                user.getDegree(),
                user.getYearOfPassing(),
                user.getCgpa(),
                user.getCurrentCompany(),
                user.getCurrentPosition(),
                user.getCurrentSalary(),
                user.getRole(),
                "Login successful"
        );
    }

    @Transactional
    public AuthResponse updateProfile(Long userId, UpdateUserRequest request) {
        System.out.println("🔍 Update profile for userId: " + userId);

        var userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            System.out.println("❌ User NOT FOUND for update: " + userId);
            throw new IllegalArgumentException("User not found");
        }

        User user = userOpt.get();

        user.setFullName(request.getFullName());
        user.setLocation(request.getLocation());
        user.setCity(request.getCity());
        user.setPincode(request.getPincode());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setCollegeName(request.getCollegeName());
        user.setDegree(request.getDegree());
        user.setYearOfPassing(request.getYearOfPassing());
        user.setCgpa(request.getCgpa());
        user.setCurrentCompany(request.getCurrentCompany());
        user.setCurrentPosition(request.getCurrentPosition());
        user.setCurrentSalary(request.getCurrentSalary());

        User updated = userRepository.save(user);
        System.out.println("✅ Profile updated: " + updated.getEmail());

        return new AuthResponse(
                updated.getId(),
                updated.getFullName(),
                updated.getEmail(),
                updated.getLocation(),
                updated.getCity(),
                updated.getPincode(),
                updated.getPhone(),
                updated.getCollegeName(),
                updated.getDegree(),
                updated.getYearOfPassing(),
                updated.getCgpa(),
                updated.getCurrentCompany(),
                updated.getCurrentPosition(),
                updated.getCurrentSalary(),
                updated.getRole(),
                "Profile updated successfully"
        );
    }

    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        System.out.println("📋 Fetched " + users.size() + " users");
        return users;
    }

    @Transactional
    public void deleteUser(Long userId) {
        System.out.println("🗑️ Delete user attempt: " + userId);

        if (!userRepository.existsById(userId)) {
            System.out.println("❌ User NOT FOUND for delete: " + userId);
            throw new IllegalArgumentException("User not found");
        }

        userRepository.deleteById(userId);
        System.out.println("✅ User deleted: " + userId);
    }

    // 🔥 PRODUCTION READY - DYNAMIC URL
    @Transactional
    public void requestPasswordReset(String email, String resetUrl) {
        System.out.println("🔑 Password reset request for: " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        String resetToken = UUID.randomUUID().toString();
        user.setPasswordResetToken(resetToken);
        user.setPasswordResetExpiry(LocalDateTime.now().plus(1, ChronoUnit.HOURS));

        userRepository.save(user);

        // 🔥 USE DYNAMIC URL (passed from controller)
        emailService.sendPasswordResetEmail(user, resetToken);
        System.out.println("🔗 Reset URL sent: " + resetUrl.substring(0, 50) + "...");
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        System.out.println("🔑 Password reset with token: " + token.substring(0, 8) + "...");

        User user = userRepository.findByPasswordResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        if (user.getPasswordResetExpiry() == null ||
                user.getPasswordResetExpiry().isBefore(LocalDateTime.now())) {
            System.out.println("❌ Token expired for: " + user.getEmail());
            throw new RuntimeException("Token expired or invalid");
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setPasswordResetToken(null);
        user.setPasswordResetExpiry(null);

        userRepository.save(user);
        System.out.println("✅ Password reset success for: " + user.getEmail());
    }
}
