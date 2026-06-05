package com.coding.service;

import com.coding.dto.CreateJobRequest;
import com.coding.dto.JobRespDto;
import com.coding.dto.JobResponse;
import com.coding.exception.ResourceNotFoundException;
import com.coding.mapper.JobMapper;
import com.coding.model.Employer;
import com.coding.model.Job;
import com.coding.repository.EmployerRepository;
import com.coding.repository.JobRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@AllArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final EmployerRepository employerRepository;
    private final JobMapper jobMapper;

    public void createJob(CreateJobRequest dto, Principal principal){

        Employer employer = employerRepository.findByUserUsername(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Employer not found"));

        Job job = jobMapper.mapDtoToEntity(dto);

        job.setEmployer(employer);

        jobRepository.save(job);
    }

    public List<JobResponse> getAllJobs(){

        List<Job> jobs = jobRepository.findAll();

        return jobs.stream()
                .map(jobMapper::mapEntityToDto)
                .toList();
    }

    public JobRespDto getAllWithPagination(
            int page,
            int size){

        Pageable pageable = PageRequest.of(page,size);

        Page<Job> pages = jobRepository.findAll(pageable);

        long totalElements = pages.getTotalElements();

        int totalPages = pages.getTotalPages();

        List<JobResponse> jobs = pages.getContent()
                .stream()
                .map(jobMapper::mapEntityToDto)
                .toList();

        return new JobRespDto(
                totalElements,
                totalPages,
                jobs
        );
    }
}