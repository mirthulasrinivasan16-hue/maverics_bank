package com.bank.dto;

import jakarta.validation.constraints.NotBlank;

public record RejectAccountDto(

        @NotBlank(message = "Reason is mandatory")
        String reason

) {
}