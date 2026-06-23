package com.bank.dto;

public record LoanDashboardDto(

        long totalLoans,

        long requestedLoans,

        long approvedLoans,

        long rejectedLoans

) {
}