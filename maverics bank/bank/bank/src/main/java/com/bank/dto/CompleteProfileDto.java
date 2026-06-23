package com.bank.dto;

import com.bank.enums.Gender;

import java.time.LocalDate;

public record CompleteProfileDto(

        String address,

        String panNumber,

        Gender gender,

        LocalDate dob,

        Integer branchId

) {
}