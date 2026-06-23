package com.bank.dto;

public record BranchRespDto(

        int id,

        String branchName,

        String ifscCode,

        String city,

        String address

) {
}