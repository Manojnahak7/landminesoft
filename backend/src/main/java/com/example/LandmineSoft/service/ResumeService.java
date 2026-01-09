// package com.example.LandmineSoft.service;


// import com.cloudinary.Cloudinary;
// import com.cloudinary.utils.ObjectUtils;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import java.util.Map;

// @Service
// public class ResumeService {

//     @Autowired
//     private Cloudinary cloudinary;

//     public String uploadResume(MultipartFile file) throws Exception {
//         Map uploadResult = cloudinary.uploader().upload(
//                 file.getBytes(),
//                 ObjectUtils.asMap(
//                         "folder", "landminesoft/resumes",
//                         "resource_type", "auto"
//                 )
//         );
//         return (String) uploadResult.get("secure_url"); // is URL ko DB me save karega
//     }
// }


// package com.example.LandmineSoft.service;

// import com.cloudinary.Cloudinary;
// import com.cloudinary.utils.ObjectUtils;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import java.util.Map;

// @Service
// public class ResumeService {

//     @Autowired
//     private Cloudinary cloudinary;

//     public String uploadResume(MultipartFile file) throws Exception {
        
//         // 👈 PDF CHECK - CRITICAL FIX!
//         String contentType = file.getContentType();
        
//         if (contentType != null && contentType.startsWith("application/pdf")) {
//             // PDF - RAW upload (NO q_auto transformation)
//             Map uploadResult = cloudinary.uploader().upload(
//                     file.getBytes(),
//                     ObjectUtils.asMap(
//                             "folder", "landminesoft/resumes",
//                             "resource_type", "raw",
//                          "url_options", ObjectUtils.asMap("secure", true),  // Viewer ready
//                         "transformation", "f_auto"
//                     )
//             );
//             return (String) uploadResult.get("secure_url");
            
//         } else {
//             Map uploadResult = cloudinary.uploader().upload(
//                     file.getBytes(),
//                     ObjectUtils.asMap(
//                             "folder", "landminesoft/resumes",
//                             "resource_type", "auto"
//                     )
//             );
//             return (String) uploadResult.get("secure_url");
//         }
//     }
// }


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
        
        // ✅ ALL FORMATS - IMAGE TYPE FOR VIEWER SUPPORT
        String contentType = file.getContentType();
        String fileExtension = getFileExtension(file.getOriginalFilename());
        
        Map config = ObjectUtils.asMap(
            "folder", "landminesoft/resumes",
            "resource_type", "image",        // 🔥 VIEWER READY
            "format", "pdf",                 // PDF preserve
            "secure", true,                  // HTTPS
            "public_id", "resume_" + System.currentTimeMillis()  // Unique name
        );
        
        // DOC/DOCX को PDF convert option (optional)
        if ("application/msword".equals(contentType) || 
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document".equals(contentType)) {
            config.put("format", "pdf");
        }
        
        Map uploadResult = cloudinary.uploader().upload(
            file.getBytes(),
            config
        );
        
        return (String) uploadResult.get("secure_url");
    }
    
    // Helper method
    private String getFileExtension(String filename) {
        if (filename == null) return "pdf";
        int lastDot = filename.lastIndexOf('.');
        return lastDot > 0 ? filename.substring(lastDot + 1).toLowerCase() : "pdf";
    }
}

