package com.bank.dto;

import com.bank.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record EmployeeDto(

        String employeeName,

        String designation,

        String phone,

        Gender gender,

        LocalDate joiningDate,

        String email,

        String password

) {
}