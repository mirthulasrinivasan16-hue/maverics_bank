package com.bank.dto;

import jakarta.validation.constraints.NotNull;

public record AssignBranchDto(

        @NotNull
        Integer branchId

) {
}