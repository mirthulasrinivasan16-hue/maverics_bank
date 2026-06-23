package com.bank.dto;

public record CustomerSignupDto(

        String customerName,

        String username,

        String phone,

        String email,

        String password
) {
}