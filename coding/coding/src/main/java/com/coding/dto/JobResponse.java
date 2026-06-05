package com.coding.dto;

public record JobResponse(
        int id,
        String title,
        String location,
        double salary,
        String companyName
) {
}
