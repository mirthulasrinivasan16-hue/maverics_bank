package com.bank.dto;

import jakarta.validation.constraints.NotBlank;

public record RejectLoanDto(
        @NotBlank(message = "Reason is mandatory")
        String reason

) {
}