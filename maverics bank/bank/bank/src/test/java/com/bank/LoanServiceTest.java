package com.bank.service;

import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.LoanMapper;
import com.bank.model.Loan;
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
public class LoanServiceTest {

    @Mock
    private LoanRepository loanRepository;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private LoanMapper loanMapper;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private LoanService loanService;

    private Loan loan;

    @BeforeEach
    void setup() {

        loan = new Loan();
        loan.setId(1);
        loan.setLoanAmount(500000);
    }

    @Test
    void getLoanEntityById_Success() {

        when(loanRepository.findById(1))
                .thenReturn(Optional.of(loan));

        assertThat(
                loanService.getLoanEntityById(1)
                        .getLoanAmount())
                .isEqualTo(500000);
    }

    @Test
    void getLoanEntityById_Failure() {

        when(loanRepository.findById(1))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                loanService.getLoanEntityById(1))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void getAllLoans() {

        when(loanRepository.findAll())
                .thenReturn(List.of(loan));

        assertThat(
                loanService.getAll())
                .hasSize(1);
    }

    @Test
    void deleteLoan() {

        when(loanRepository.findById(1))
                .thenReturn(Optional.of(loan));

        loanService.deleteById(1);

        verify(loanRepository)
                .deleteById(1);
    }

    @Test
    void loanExists() {

        when(loanRepository.findById(1))
                .thenReturn(Optional.of(loan));

        assertThat(
                loanService.getLoanEntityById(1))
                .isNotNull();
    }
}