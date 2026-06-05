package com.coding.dto;

import java.util.List;

public record ApplicationRespDto(
        long totalElements,
        int totalPages,
        List<ApplicationResponse> applications
) {
}