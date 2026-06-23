package com.bank.dto;

import com.bank.enums.Gender;
import java.time.LocalDate;

public record EmployeeRespDto(

        int id,

        String employeeId,

        String employeeName,

        String designation,

        String phone,

        Gender gender,

        LocalDate joiningDate,

        int userId,

        String username,

        String branchName,

        String ifscCode,

        String city,

        String address

) {
}