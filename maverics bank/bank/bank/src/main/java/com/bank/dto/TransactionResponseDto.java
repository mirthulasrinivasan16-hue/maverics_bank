package com.bank.dto;

import java.util.List;

public record TransactionResponseDto(

        long totalElements,

        int totalPages,

        List<TransactionRespDto> data

) {
}