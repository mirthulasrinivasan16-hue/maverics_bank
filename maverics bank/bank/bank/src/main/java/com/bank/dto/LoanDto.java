package com.bank.dto;

import com.bank.enums.LoanType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record LoanDto(

        @NotNull
        LoanType loanType,

        @NotNull
        @Positive
        Double loanAmount,

        @NotNull
        Double interestRate,

        @NotNull
        Integer tenureMonths,

        @NotNull
        Double monthlyEmi,

        Double monthlySalary,

        @NotNull
        Integer customerId

) {
}