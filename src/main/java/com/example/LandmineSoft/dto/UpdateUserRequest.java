package com.example.LandmineSoft.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateUserRequest {

    @NotBlank
    @Size(min = 2, max = 80)
    private String fullName;

    @NotBlank
    @Size(min = 2, max = 80)
    private String location;

    @NotBlank
    @Size(min = 2, max = 80)
    private String city;

    @NotBlank
    @Size(min = 4, max = 10)
    private String pincode;

    @NotBlank
    @Size(min = 7, max = 20)
    private String phone;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 2, max = 120)
    private String collegeName;

    @NotBlank
    @Size(min = 2, max = 80)
    private String degree;

    @NotBlank
    @Size(min = 4, max = 10)
    private String yearOfPassing;

    @NotBlank
    @Size(min = 1, max = 10)
    private String cgpa;

    private String currentCompany;
    private String currentPosition;
    private String currentSalary;

    // constructors, getters & setters
    public UpdateUserRequest() {
    }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

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
}

