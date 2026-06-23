package com.bank.dto;

import com.bank.enums.TransactionStatus;
import com.bank.enums.TransactionType;

import java.time.LocalDateTime;

public record TransactionRespDto(

        int id,

        String referenceNumber,

        TransactionType transactionType,

        double amount,

        TransactionStatus status,

        LocalDateTime transactionDate,

        String fromAccount,

        String toAccount,

        String customerName

) {
}