package com.bank.mapper;

import com.bank.dto.CustomerRespDto;
import com.bank.model.Account;
import com.bank.model.Customer;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomerMapper {

    public CustomerRespDto mapEntityToDto(
            Customer customer){

        List<String> accountNumbers =
                customer.getAccounts() != null
                        ? customer.getAccounts()
                        .stream()
                        .map(Account::getAccountNumber)
                        .toList()
                        : List.of();
        return new CustomerRespDto(

                customer.getId(),

                customer.getCustomerName(),

                customer.getPhone(),

                customer.getAddress(),

                customer.getPanNumber(),

                customer.getGender(),

                customer.getDob(),

                customer.getUser().getUsername(),

                customer.getBranch() != null
                        ? customer.getBranch().getId()
                        : null,

                customer.getBranch() != null
                        ? customer.getBranch().getBranchName()
                        : null,

                customer.getBranch() != null
                        ? customer.getBranch().getIfscCode()
                        : null,

                customer.getBranch() != null
                        ? customer.getBranch().getCity()
                        : null,

                customer.getBranch() != null
                        ? customer.getBranch().getAddress()
                        : null,

                customer.getAccounts()
                        .stream()
                        .map(account ->
                                account.getAccountNumber())
                        .toList(),

                customer.isProfileCompleted()
        );
    }
}