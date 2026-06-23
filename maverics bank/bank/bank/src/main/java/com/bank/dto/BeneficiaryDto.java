package com.bank.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BeneficiaryDto(

        @NotNull
        Integer customerId,

        @NotBlank
        String accountNumber,

        String nickname
) {
}