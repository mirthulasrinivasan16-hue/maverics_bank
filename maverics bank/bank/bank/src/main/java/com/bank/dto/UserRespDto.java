package com.bank.dto;

import com.bank.enums.Role;

public record UserRespDto(

        int id,
        String username,
        String email,
        Role role,
        boolean passwordChanged

) {
}