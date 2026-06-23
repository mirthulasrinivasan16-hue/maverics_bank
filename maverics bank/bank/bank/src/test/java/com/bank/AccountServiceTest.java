package com.bank.service;

import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.AccountMapper;
import com.bank.model.Account;
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
public class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private BranchRepository branchRepository;

    @Mock
    private AccountMapper accountMapper;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private AccountService accountService;

    private Account account;

    @BeforeEach
    void setup() {

        account = new Account();
        account.setId(1);
        account.setAccountNumber("ACC1001");
        account.setBalance(10000);
    }

    @Test
    void getAccountEntityById_Success() {

        when(accountRepository.findById(1))
                .thenReturn(Optional.of(account));

        assertThat(
                accountService.getAccountEntityById(1)
                        .getAccountNumber())
                .isEqualTo("ACC1001");
    }

    @Test
    void getAccountEntityById_Failure() {

        when(accountRepository.findById(1))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                accountService.getAccountEntityById(1))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void getAllAccounts() {

        when(accountRepository.findAll())
                .thenReturn(List.of(account));

        assertThat(
                accountService.getAll())
                .hasSize(1);
    }

    @Test
    void deleteAccount() {

        when(accountRepository.findById(1))
                .thenReturn(Optional.of(account));

        accountService.deleteById(1);

        verify(accountRepository)
                .deleteById(1);
    }

    @Test
    void getAccountByNumber() {

        when(accountRepository.findByAccountNumber("ACC1001"))
                .thenReturn(account);

        assertThat(
                accountRepository.findByAccountNumber("ACC1001"))
                .isNotNull();
    }
}