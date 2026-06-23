package com.bank.dto;

import com.bank.enums.LoanStatus;
import com.bank.enums.LoanType;

import java.time.LocalDateTime;

public record LoanRespDto(

        int id,

        LoanType loanType,

        double loanAmount,

        double interestRate,

        Integer tenureMonths,

        Double monthlyEmi,

        LoanStatus status,

        LocalDateTime appliedDate,

        String customerName,

        String recommendedAction,

        String eligibilityRemark

) {
}