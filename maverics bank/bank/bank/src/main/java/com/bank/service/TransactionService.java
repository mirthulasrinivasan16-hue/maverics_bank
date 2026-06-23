package com.bank.service;

import com.bank.dto.FundTransferDto;
import com.bank.dto.TransactionDto;
import com.bank.dto.TransactionRespDto;
import com.bank.dto.TransactionResponseDto;
import com.bank.enums.TransactionStatus;
import com.bank.enums.TransactionType;
import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.TransactionMapper;
import com.bank.model.Account;
import com.bank.model.Employee;
import com.bank.model.Transaction;
import com.bank.repository.AccountRepository;
import com.bank.repository.EmployeeRepository;
import com.bank.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final TransactionMapper transactionMapper;
    private final EmployeeRepository employeeRepository;

    public List<TransactionRespDto> getAll() {

        List<Transaction> transactions =
                transactionRepository.findAll();

        return transactions.stream()
                .map(transactionMapper::mapEntityToDto)
                .toList();
    }

    public Transaction getTransactionEntityById(
            int id) {

        return transactionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid transaction id"));
    }

    public TransactionRespDto getById(int id) {

        Transaction transaction =
                getTransactionEntityById(id);

        return transactionMapper
                .mapEntityToDto(transaction);
    }

    public void update(
            int id,
            TransactionDto dto) {

        Transaction transaction =
                getTransactionEntityById(id);

        Account account =
                accountRepository.findById(
                                dto.accountId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid account id"));

        transaction.setTransactionType(
                dto.transactionType());

        transaction.setAmount(
                dto.amount());

        if (dto.transactionType()
                == TransactionType.DEPOSIT) {

            transaction.setToAccount(
                    account);

            transaction.setFromAccount(
                    null);
        } else {

            transaction.setFromAccount(
                    account);

            transaction.setToAccount(
                    null);
        }

        transactionRepository.save(
                transaction);
    }

    public void deleteById(int id) {

        getTransactionEntityById(id);

        transactionRepository.deleteById(id);
    }

    private String generateReferenceNumber() {

        long count =
                transactionRepository.count() + 1;

        return String.format(
                "TXN%06d",
                count);
    }

    public void deposit(
            int accountId,
            double amount) {

        if (amount <= 0) {

            throw new RuntimeException(
                    "Amount must be greater than zero");
        }

        Account account =
                accountRepository.findById(accountId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid account"));

        account.setBalance(
                account.getBalance()
                        + amount);

        accountRepository.save(account);

        Transaction transaction =
                new Transaction();

        transaction.setReferenceNumber(
                generateReferenceNumber());

        transaction.setTransactionType(
                TransactionType.DEPOSIT);

        transaction.setAmount(amount);

        transaction.setStatus(
                TransactionStatus.SUCCESS);

        transaction.setToAccount(account);

        transactionRepository.save(
                transaction);
    }

    public void withdraw(
            int accountId,
            double amount) {

        if (amount <= 0) {

            throw new RuntimeException(
                    "Amount must be greater than zero");
        }

        Account account =
                accountRepository.findById(accountId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid account"));

        if (amount > account.getBalance()) {

            throw new RuntimeException(
                    "Insufficient balance");
        }

        account.setBalance(
                account.getBalance()
                        - amount);

        accountRepository.save(account);

        Transaction transaction =
                new Transaction();

        transaction.setReferenceNumber(
                generateReferenceNumber());

        transaction.setTransactionType(
                TransactionType.WITHDRAW);

        transaction.setAmount(amount);

        transaction.setStatus(
                TransactionStatus.SUCCESS);

        transaction.setFromAccount(account);

        transactionRepository.save(
                transaction);
    }

    public void transfer(
            FundTransferDto dto) {

        Account fromAccount =
                accountRepository.findByAccountNumber(
                        dto.fromAccount());

        Account toAccount =
                accountRepository.findByAccountNumber(
                        dto.toAccount());

        if (fromAccount == null
                || toAccount == null) {

            throw new ResourceNotFoundException(
                    "Invalid account");
        }

        if (dto.amount() <= 0) {

            throw new RuntimeException(
                    "Amount must be greater than zero");
        }

        if (dto.amount()
                > fromAccount.getBalance()) {

            throw new RuntimeException(
                    "Insufficient balance");
        }

        fromAccount.setBalance(
                fromAccount.getBalance()
                        - dto.amount());

        toAccount.setBalance(
                toAccount.getBalance()
                        + dto.amount());

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        Transaction transaction =
                new Transaction();

        transaction.setReferenceNumber(
                generateReferenceNumber());

        transaction.setTransactionType(
                TransactionType.TRANSFER);

        transaction.setAmount(
                dto.amount());

        transaction.setStatus(
                TransactionStatus.SUCCESS);

        transaction.setFromAccount(
                fromAccount);

        transaction.setToAccount(
                toAccount);

        transactionRepository.save(
                transaction);
    }

    public List<TransactionRespDto>
    getTransactionsByCustomer(
            int customerId){

        return transactionRepository
                .getCustomerTransactions(
                        customerId)
                .stream()
                .map(transactionMapper::mapEntityToDto)
                .toList();
    }

    public List<TransactionRespDto>
    getTransactionsByEmployeeBranch(
            int userId){

        Employee employee =
                employeeRepository
                        .findByUserId(userId);

        if(employee == null){

            throw new ResourceNotFoundException(
                    "Employee not found");
        }

        return transactionRepository
                .getTransactionsByBranch(
                        employee.getBranch()
                                .getId())
                .stream()
                .map(transactionMapper::mapEntityToDto)
                .toList();
    }

    public TransactionResponseDto
    getTransactionsByCustomerV2(

            int customerId,

            int page,

            int size,

            TransactionType type,

            TransactionStatus status){

        Pageable pageable =
                PageRequest.of(
                        page,
                        size);

        Page<Transaction> pages;

        if(type != null && status != null){

            pages =
                    transactionRepository
                            .getCustomerTransactionsByTypeAndStatus(
                                    customerId,
                                    type,
                                    status,
                                    pageable);
        }

        else if(type != null){

            pages =
                    transactionRepository
                            .getCustomerTransactionsByType(
                                    customerId,
                                    type,
                                    pageable);
        }

        else if(status != null){

            pages =
                    transactionRepository
                            .getCustomerTransactionsByStatus(
                                    customerId,
                                    status,
                                    pageable);
        }

        else{

            pages =
                    transactionRepository
                            .getCustomerTransactions(
                                    customerId,
                                    pageable);
        }

        return new TransactionResponseDto(

                pages.getTotalElements(),

                pages.getTotalPages(),

                pages.getContent()
                        .stream()
                        .map(transactionMapper::mapEntityToDto)
                        .toList()
        );
    }

    public TransactionResponseDto
    getAllTransactionsV2(

            int page,

            int size,

            TransactionType type,

            TransactionStatus status){

        Pageable pageable =
                PageRequest.of(
                        page,
                        size);

        Page<Transaction> pages;

        if(type != null && status != null){

            pages =
                    transactionRepository
                            .findByTransactionTypeAndStatus(
                                    type,
                                    status,
                                    pageable);
        }

        else if(type != null){

            pages =
                    transactionRepository
                            .findByTransactionType(
                                    type,
                                    pageable);
        }

        else if(status != null){

            pages =
                    transactionRepository
                            .findByStatus(
                                    status,
                                    pageable);
        }

        else{

            pages =
                    transactionRepository
                            .findAll(pageable);
        }

        return new TransactionResponseDto(

                pages.getTotalElements(),

                pages.getTotalPages(),

                pages.getContent()
                        .stream()
                        .map(transactionMapper::mapEntityToDto)
                        .toList()
        );
    }
}