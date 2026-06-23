package com.bank.dto;

import java.util.List;

public record LoanResponseDto(

        List<LoanRespDto> data,

        int totalPages

) {
}