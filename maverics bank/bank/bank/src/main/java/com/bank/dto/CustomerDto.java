package com.bank.dto;

import com.bank.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CustomerDto(

        @NotNull(message = "Customer name is mandatory")
        @NotBlank(message = "Customer name is mandatory")
        String customerName,

        @NotNull(message = "Phone number is mandatory")
        @NotBlank(message = "Phone number is mandatory")
        String phone,

        @NotNull(message = "Address is mandatory")
        @NotBlank(message = "Address is mandatory")
        String address,

        @NotNull(message = "PAN number is mandatory")
        @NotBlank(message = "PAN number is mandatory")
        String panNumber,

        @NotNull(message = "Gender is mandatory")
        Gender gender,

        @NotNull(message = "Date of birth is mandatory")
        LocalDate dob,

        @NotNull(message = "User id is mandatory")
        Integer userId,

        @NotNull(message = "Branch id is mandatory")
        Integer branchId

) {
}