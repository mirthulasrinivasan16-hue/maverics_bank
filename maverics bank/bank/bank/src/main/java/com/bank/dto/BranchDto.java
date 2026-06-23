package com.bank.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BranchDto(

        @NotBlank(message = "Branch name is mandatory")
        String branchName,

        @NotBlank(message = "IFSC code is mandatory")
        String ifscCode,

        @NotBlank(message = "City is mandatory")
        String city,

        @NotBlank(message = "Address is mandatory")
        String address

) {
}