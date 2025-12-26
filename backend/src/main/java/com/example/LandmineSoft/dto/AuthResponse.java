package com.example.LandmineSoft.dto;
public class AuthResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String location;
    private String city;
    private String pincode;
    private String phone;
    private String collegeName;
    private String degree;
    private String yearOfPassing;
    private String cgpa;
    private String currentCompany;
    private String currentPosition;
    private String currentSalary;
    private String role;        // 👈 ADDED
    private String message;     // 👈 ADDED

    public AuthResponse() {
    }

    // 👈 FIXED: 16 parameters constructor
    public AuthResponse(
            Long userId,
            String fullName,
            String email,
            String location,
            String city,
            String pincode,
            String phone,
            String collegeName,
            String degree,
            String yearOfPassing,
            String cgpa,
            String currentCompany,
            String currentPosition,
            String currentSalary,
            String role,            // 👈 15th
            String message          // 👈 16th
    ) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.location = location;
        this.city = city;
        this.pincode = pincode;
        this.phone = phone;
        this.collegeName = collegeName;
        this.degree = degree;
        this.yearOfPassing = yearOfPassing;
        this.cgpa = cgpa;
        this.currentCompany = currentCompany;
        this.currentPosition = currentPosition;
        this.currentSalary = currentSalary;
        this.role = role;           // 👈 FIXED
        this.message = message;     // 👈 FIXED
    }

    // ALL getters & setters (same as before)
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getCollegeName() { return collegeName; }
    public void setCollegeName(String collegeName) { this.collegeName = collegeName; }
    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }
    public String getYearOfPassing() { return yearOfPassing; }
    public void setYearOfPassing(String yearOfPassing) { this.yearOfPassing = yearOfPassing; }
    public String getCgpa() { return cgpa; }
    public void setCgpa(String cgpa) { this.cgpa = cgpa; }
    public String getCurrentCompany() { return currentCompany; }
    public void setCurrentCompany(String currentCompany) { this.currentCompany = currentCompany; }
    public String getCurrentPosition() { return currentPosition; }
    public void setCurrentPosition(String currentPosition) { this.currentPosition = currentPosition; }
    public String getCurrentSalary() { return currentSalary; }
    public void setCurrentSalary(String currentSalary) { this.currentSalary = currentSalary; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
