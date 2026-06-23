package com.bank.dto;

public record BeneficiaryRespDto(

        int id,

        String beneficiaryName,

        String accountNumber,

        String ifscCode,

        String branchName,

        String nickname
) {
}