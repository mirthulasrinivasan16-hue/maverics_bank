package com.coding.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateJobRequest(
        @NotBlank
        String title,

        @NotBlank
        String description,

        String location,

        @NotNull
        @Positive
        double salary
) {
}
