package com.bank.dto;

import java.util.List;

public record AccountResponseDto(

        List<AccountRespDto> data,

        int totalPages

) {
}