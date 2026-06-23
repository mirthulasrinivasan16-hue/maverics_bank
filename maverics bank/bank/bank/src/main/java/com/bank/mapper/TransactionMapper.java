package com.bank.mapper;

import com.bank.dto.TransactionRespDto;
import com.bank.model.Transaction;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    public TransactionRespDto mapEntityToDto(
            Transaction transaction){

        return new TransactionRespDto(

                transaction.getId(),

                transaction.getReferenceNumber(),

                transaction.getTransactionType(),

                transaction.getAmount(),

                transaction.getStatus(),

                transaction.getTransactionDate(),

                transaction.getFromAccount() != null
                        ? transaction.getFromAccount()
                        .getAccountNumber()
                        : "-",

                transaction.getToAccount() != null
                        ? transaction.getToAccount()
                        .getAccountNumber()
                        : "-",

                transaction.getFromAccount() != null
                        ? transaction.getFromAccount()
                        .getCustomer()
                        .getCustomerName()
                        : transaction.getToAccount()
                        .getCustomer()
                        .getCustomerName()
        );
    }
}