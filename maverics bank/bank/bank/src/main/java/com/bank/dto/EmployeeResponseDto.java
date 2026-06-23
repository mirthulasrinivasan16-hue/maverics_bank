package com.bank.dto;

import java.util.List;

public record EmployeeResponseDto(

        long totalRecords,

        int totalPages,

        List<EmployeeRespDto> data

) {
}