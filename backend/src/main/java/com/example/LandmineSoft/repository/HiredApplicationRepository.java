package com.example.LandmineSoft.repository;

import com.example.LandmineSoft.entity.HiredApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; 

@Repository
public interface HiredApplicationRepository extends JpaRepository<HiredApplication, Long> {
  List<HiredApplication> findByEmail(String email);
}
