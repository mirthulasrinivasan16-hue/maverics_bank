package com.coding.repository;

import com.coding.model.JobSeeker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobSeekerRepository extends JpaRepository<JobSeeker,Integer> {
    Optional<JobSeeker> findByUserUsername(String username);
}
