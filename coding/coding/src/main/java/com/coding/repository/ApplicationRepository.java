package com.coding.repository;

import com.coding.model.Application;
import com.coding.model.JobSeeker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application,Integer> {
    List<Application> findByJobSeeker(JobSeeker jobSeeker);
    Page<Application> findByJobSeeker(JobSeeker jobSeeker, Pageable pageable);
}
