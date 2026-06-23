package com.bank.dto;

import com.bank.enums.AccountType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record AccountDto(

        String accountNumber,

        @NotNull(message = "Account type is mandatory")
        AccountType accountType,

        @NotNull(message = "Balance is mandatory")
        @PositiveOrZero(message = "Balance cannot be negative")
        Double balance,

        @NotNull(message = "Customer id is mandatory")
        Integer customerId,

        @NotNull(message = "Branch id is mandatory")
        Integer branchId

) {
}