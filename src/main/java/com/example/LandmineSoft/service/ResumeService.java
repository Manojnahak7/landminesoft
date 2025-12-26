package com.example.LandmineSoft.service;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class ResumeService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadResume(MultipartFile file) throws Exception {
        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "landminesoft/resumes",
                        "resource_type", "auto"
                )
        );
        return (String) uploadResult.get("secure_url"); // is URL ko DB me save karega
    }
}
