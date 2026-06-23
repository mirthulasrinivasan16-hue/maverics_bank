package com.bank.dto;

import com.bank.enums.AccountStatus;
import com.bank.enums.AccountType;

import java.time.LocalDateTime;
import java.util.List;

public record AccountRespDto(

        int id,
        String accountNumber,
        AccountType accountType,
        double balance,
        AccountStatus status,

        LocalDateTime createdAt,
        LocalDateTime verifiedDate,
        LocalDateTime approvedDate,

        String rejectionReason,

        String customerName,
        String customerPhone,

        String branchName,
        String ifscCode

) {
}