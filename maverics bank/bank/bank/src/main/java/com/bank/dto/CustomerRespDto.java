package com.bank.dto;

import com.bank.enums.Gender;

import java.time.LocalDate;
import java.util.List;

public record CustomerRespDto(

        int id,

        String customerName,

        String phone,

        String address,

        String panNumber,

        Gender gender,

        LocalDate dob,

        String username,

        Integer branchId,

        String branchName,

        String ifscCode,

        String city,

        String branchAddress,

        List<String> accountNumbers,

        boolean profileCompleted

) {
}