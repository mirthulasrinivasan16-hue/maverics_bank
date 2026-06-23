package com.bank.dto;

import com.bank.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserDto(

        @NotNull(message = "Username is mandatory")
        @NotBlank(message = "Username is mandatory")
        String username,

        @NotNull(message = "Email is mandatory")
        @NotBlank(message = "Email is mandatory")
        @Email(message = "Invalid email format")
        String email,

        @NotNull(message = "Password is mandatory")
        @NotBlank(message = "Password is mandatory")
        String password,

        @NotNull(message = "Role is mandatory")
        Role role

) {
}