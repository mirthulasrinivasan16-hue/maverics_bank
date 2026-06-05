package com.coding.mapper;

import com.coding.dto.ApplicationResponse;
import com.coding.model.Application;
import org.springframework.stereotype.Component;

@Component
public class ApplicationMapper {

    public ApplicationResponse mapEntityToDto(
            Application application){

        return new ApplicationResponse(
                application.getId(),
                application.getAppliedAt(),
                application.getJob().getTitle(),
                application.getJob()
                        .getEmployer()
                        .getCompanyName()
        );
    }
}