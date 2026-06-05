package com.coding.controller;

import com.coding.dto.ApplicationRespDto;
import com.coding.dto.ApplicationResponse;
import com.coding.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/api/application")
    public void applyForJob(@PathVariable int jobId, Principal principal){

        applicationService.applyForJob(jobId, principal);
    }

    @GetMapping("/api/my-applications")
    public ApplicationRespDto getMyApplicationsWithPagination(
            Principal principal,
            @RequestParam int page,
            @RequestParam int size){

        return applicationService
                .getMyApplicationsWithPagination(
                        principal,
                        page,
                        size);
    }
}