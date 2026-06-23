package com.bank.mapper;

import com.bank.dto.AccountRespDto;
import com.bank.model.Account;
import com.bank.model.Customer;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AccountMapper {

    public AccountRespDto mapEntityToDto(
            Account account){

        return new AccountRespDto(

                account.getId(),
                account.getAccountNumber(),
                account.getAccountType(),
                account.getBalance(),
                account.getStatus(),

                account.getCreatedAt(),
                account.getVerifiedDate(),
                account.getApprovedDate(),

                account.getRejectionReason(),

                account.getCustomer().getCustomerName(),
                account.getCustomer().getPhone(),
                account.getBranch().getBranchName(),
                account.getBranch().getIfscCode()

        );
    }
}