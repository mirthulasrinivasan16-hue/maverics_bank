package com.bank.dto;

public record LoginResponseDto(

        int id,

        Integer customerId,

        String username,

        String role,

        boolean profileCompleted

) {
}