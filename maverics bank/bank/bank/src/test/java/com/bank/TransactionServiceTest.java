package com.bank.service;

import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.TransactionMapper;
import com.bank.model.Transaction;
import com.bank.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private TransactionMapper transactionMapper;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private TransactionService transactionService;

    private Transaction transaction;

    @BeforeEach
    void setup() {

        transaction = new Transaction();
        transaction.setId(1);
        transaction.setAmount(1000);
    }

    @Test
    void getTransactionById_Success() {

        when(transactionRepository.findById(1))
                .thenReturn(Optional.of(transaction));

        assertThat(
                transactionService
                        .getTransactionEntityById(1)
                        .getAmount())
                .isEqualTo(1000);
    }

    @Test
    void getTransactionById_Failure() {

        when(transactionRepository.findById(1))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                transactionService
                        .getTransactionEntityById(1))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void getAllTransactions() {

        when(transactionRepository.findAll())
                .thenReturn(List.of(transaction));

        assertThat(
                transactionService.getAll())
                .hasSize(1);
    }

    @Test
    void deleteTransaction() {

        when(transactionRepository.findById(1))
                .thenReturn(Optional.of(transaction));

        transactionService.deleteById(1);

        verify(transactionRepository)
                .deleteById(1);
    }

    @Test
    void transactionExists() {

        when(transactionRepository.findById(1))
                .thenReturn(Optional.of(transaction));

        assertThat(
                transactionService
                        .getTransactionEntityById(1))
                .isNotNull();
    }
}