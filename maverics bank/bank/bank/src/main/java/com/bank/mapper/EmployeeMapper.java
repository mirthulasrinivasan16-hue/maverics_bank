package com.bank.mapper;

import com.bank.dto.EmployeeRespDto;
import com.bank.dto.EmployeeResponseDto;
import com.bank.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeMapper {

    public EmployeeRespDto mapEntityToDto(
            Employee employee){

        return new EmployeeRespDto(

                employee.getId(),

                employee.getEmployeeId(),

                employee.getEmployeeName(),

                employee.getDesignation(),

                employee.getPhone(),

                employee.getGender(),

                employee.getJoiningDate(),

                employee.getUser().getId(),

                employee.getUser().getUsername(),

                employee.getBranch() != null
                        ? employee.getBranch().getBranchName()
                        : null,

                employee.getBranch() != null
                        ? employee.getBranch().getIfscCode()
                        : null,

                employee.getBranch() != null
                        ? employee.getBranch().getCity()
                        : null,

                employee.getBranch() != null
                        ? employee.getBranch().getAddress()
                        : null
        );
    }

    public EmployeeResponseDto mapEntityToDto(
            Page<Employee> pages){

        long totalRecords =
                pages.getTotalElements();

        int totalPages =
                pages.getTotalPages();

        List<EmployeeRespDto> data =
                pages.getContent()
                        .stream()
                        .map(this::mapEntityToDto)
                        .toList();

        return new EmployeeResponseDto(
                totalRecords,
                totalPages,
                data
        );
    }
}