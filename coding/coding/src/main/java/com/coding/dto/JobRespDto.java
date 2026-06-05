package com.coding.dto;

import java.util.List;

public record JobRespDto(
        long totalElements,
        int totalPages,
        List<JobResponse> jobs
) {
}