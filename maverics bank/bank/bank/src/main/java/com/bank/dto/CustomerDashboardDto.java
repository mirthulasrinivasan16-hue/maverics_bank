package com.bank.dto;

public record CustomerDashboardDto(

        int totalAccounts,

        int totalLoans,

        String branchName,

        double availableBalance

) {
}