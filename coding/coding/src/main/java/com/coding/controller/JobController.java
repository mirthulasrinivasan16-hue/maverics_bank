package com.coding.controller;

import com.coding.dto.CreateJobRequest;
import com.coding.dto.JobRespDto;
import com.coding.dto.JobResponse;
import com.coding.service.JobService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    @PostMapping("/add")
    public void createJob(@Valid @RequestBody CreateJobRequest dto, Principal principal){

        jobService.createJob(dto, principal);
    }

    @GetMapping("/all")
    public JobRespDto getAllWithPagination(
            @RequestParam int page,
            @RequestParam int size){

        return jobService.getAllWithPagination(page,size);
    }
}