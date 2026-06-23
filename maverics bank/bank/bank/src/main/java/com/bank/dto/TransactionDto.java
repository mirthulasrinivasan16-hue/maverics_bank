package com.bank.dto;

import com.bank.enums.TransactionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record TransactionDto(

        @NotNull
        TransactionType transactionType,

        @NotNull
        @Positive
        Double amount,

        @NotNull
        Integer accountId

) {
}