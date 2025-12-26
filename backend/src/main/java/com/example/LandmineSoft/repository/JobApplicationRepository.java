package com.example.LandmineSoft.repository;

import com.example.LandmineSoft.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByJobId(Long jobId);
    List<JobApplication> findByUserId(Long userId);
    boolean existsByUserIdAndJobId(Long userId, Long jobId);

    // ✅ FIXED - NO companyName, simple fields only
    @Query("SELECT a.id, a.userId, a.jobId, a.jobTitle, a.status, a.appliedAt " +
            "FROM JobApplication a WHERE a.userId = :userId " +
            "ORDER BY CASE WHEN a.status = 'PENDING' THEN 1 WHEN a.status = 'IN_PROGRESS' THEN 2 WHEN a.status = 'REJECTED' THEN 3 ELSE 4 END")
    List<Object[]> findUserApplicationsSafe(@Param("userId") Long userId);
}
