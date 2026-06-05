package com.coding.service;

import com.coding.dto.ApplicationRespDto;
import com.coding.dto.ApplicationResponse;
import com.coding.exception.ResourceNotFoundException;
import com.coding.mapper.ApplicationMapper;
import com.coding.model.Application;
import com.coding.model.Job;
import com.coding.model.JobSeeker;
import com.coding.repository.ApplicationRepository;
import com.coding.repository.JobRepository;
import com.coding.repository.JobSeekerRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@AllArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final JobSeekerRepository jobSeekerRepository;
    private final ApplicationMapper applicationMapper;

    public void applyForJob(int jobId, Principal principal){

        JobSeeker seeker = jobSeekerRepository.findByUserUsername(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Job Seeker not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        Application application = new Application();

        application.setJob(job);
        application.setJobSeeker(seeker);

        applicationRepository.save(application);
    }

    public List<ApplicationResponse> getMyApplications(Principal principal){

        JobSeeker seeker = jobSeekerRepository.findByUserUsername(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Job Seeker not found"));

        List<Application> applications = applicationRepository.findByJobSeeker(seeker);

        return applications.stream()
                .map(applicationMapper::mapEntityToDto)
                .toList();
    }

    public ApplicationRespDto getMyApplicationsWithPagination(
            Principal principal,
            int page,
            int size){

        String username = principal.getName();

        JobSeeker seeker = jobSeekerRepository
                .findByUserUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job Seeker not found"));

        Pageable pageable = PageRequest.of(page,size);

        Page<Application> pages =
                applicationRepository.findByJobSeeker(
                        seeker,
                        pageable);

        long totalElements = pages.getTotalElements();

        int totalPages = pages.getTotalPages();

        List<ApplicationResponse> applications =
                pages.getContent()
                        .stream()
                        .map(applicationMapper::mapEntityToDto)
                        .toList();

        return new ApplicationRespDto(
                totalElements,
                totalPages,
                applications
        );
    }
}