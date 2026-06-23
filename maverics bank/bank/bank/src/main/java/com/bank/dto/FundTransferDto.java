package com.bank.dto;

public record FundTransferDto(

        String fromAccount,

        String toAccount,

        double amount

) {
}