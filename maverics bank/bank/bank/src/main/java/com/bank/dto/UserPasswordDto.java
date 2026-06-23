package com.bank.dto;

import jakarta.validation.constraints.NotBlank;

public record UserPasswordDto(

        @NotBlank
        String oldPassword,

        @NotBlank
        String newPassword

) {
}