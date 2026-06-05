package com.coding.mapper;

import com.coding.dto.CreateJobRequest;
import com.coding.dto.JobResponse;
import com.coding.model.Job;
import org.springframework.stereotype.Component;

@Component
public class JobMapper {

    public Job mapDtoToEntity(CreateJobRequest dto){

        Job job = new Job();

        job.setTitle(dto.title());
        job.setDescription(dto.description());
        job.setLocation(dto.location());
        job.setSalary(dto.salary());

        return job;
    }

    public JobResponse mapEntityToDto(Job job){

        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getLocation(),
                job.getSalary(),
                job.getEmployer().getCompanyName()
        );
    }
}