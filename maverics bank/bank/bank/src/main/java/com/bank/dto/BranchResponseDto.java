package com.bank.dto;

import java.util.List;

public record BranchResponseDto(

        long totalElements,

        int totalPages,

        List<BranchRespDto> data
) {
}