package com.bank.dto;

import java.util.List;

public record CustomerResponseDto(

        List<CustomerRespDto> data,

        int totalPages

) {}