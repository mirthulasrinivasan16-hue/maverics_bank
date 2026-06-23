package com.bank.service;

import com.bank.dto.*;
import com.bank.enums.LoanStatus;
import com.bank.enums.LoanType;
import com.bank.enums.Role;
import com.bank.exception.AccessDeniedException;
import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.LoanMapper;
import com.bank.model.Customer;
import com.bank.model.Employee;
import com.bank.model.Loan;
import com.bank.model.User;
import com.bank.repository.CustomerRepository;
import com.bank.repository.EmployeeRepository;
import com.bank.repository.LoanRepository;
import com.bank.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class LoanService {

    private final LoanRepository loanRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final LoanMapper loanMapper;
    private final EmployeeRepository employeeRepository;

    public List<LoanRespDto> getAll() {
        checkEscalations();
        List<Loan> loans =
                loanRepository.findAll();

        return loans.stream()
                .map(loanMapper::mapEntityToDto)
                .toList();
    }

    public Loan getLoanEntityById(int id) {

        return loanRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid loan id"));
    }

    public LoanRespDto getById(int id) {

        Loan loan =
                getLoanEntityById(id);

        return loanMapper
                .mapEntityToDto(loan);
    }

    public void addLoan(LoanDto dto){

        Customer customer =
                customerRepository
                        .findById(
                                dto.customerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid customer id"));

        Loan loan = new Loan();

        loan.setLoanType(
                dto.loanType());

        loan.setLoanAmount(
                dto.loanAmount());

        loan.setInterestRate(
                dto.interestRate());

        loan.setTenureMonths(
                dto.tenureMonths());

        loan.setMonthlyEmi(
                dto.monthlyEmi());

        loan.setCustomer(
                customer);

        loan.setAppliedDate(
                LocalDateTime.now());

        loan.setStatus(
                LoanStatus.REQUESTED);

        customer.setMonthlySalary(
                dto.monthlySalary());

        customerRepository.save(
                customer);

        boolean eligible =
                checkEligibility(
                        customer,
                        dto.loanAmount(),
                        dto.tenureMonths());

        if(eligible){

            loan.setRecommendedAction(
                    "APPROVE");

            loan.setEligibilityRemark(
                    "Customer satisfies loan eligibility criteria based on salary and tenure");
        }
        else{

            loan.setRecommendedAction(
                    "REJECT");

            loan.setEligibilityRemark(
                    "Requested loan amount exceeds eligible loan limit");
        }

        loanRepository.save(
                loan);
    }

    public void update(
            int id,
            LoanDto dto) {

        Loan loan =
                getLoanEntityById(id);

        Customer customer =
                customerRepository.findById(
                                dto.customerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid customer id"));

        loan.setLoanType(
                dto.loanType());

        loan.setLoanAmount(
                dto.loanAmount());

        loan.setInterestRate(
                dto.interestRate());

        loan.setCustomer(
                customer);
        loan.setTenureMonths(
                dto.tenureMonths());

        loan.setMonthlyEmi(
                dto.monthlyEmi());

        loanRepository.save(loan);
    }

    public void deleteById(int id) {

        getLoanEntityById(id);

        loanRepository.deleteById(id);
    }


    public void approveLoan(
            int loanId,
            int userId){

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid user id"));

        Loan loan =
                getLoanEntityById(loanId);

        if(user.getRole() == Role.EMPLOYEE){

            if(loan.getStatus()
                    != LoanStatus.REQUESTED){

                throw new AccessDeniedException(
                        "Employee can review only REQUESTED loans");
            }

            loan.setStatus(
                    LoanStatus.APPROVED);

            loan.setVerifiedByEmployeeId(
                    user.getId());

            loan.setApprovedDate(
                    LocalDateTime.now());
        }

        else if(user.getRole() == Role.ADMIN){

            if(loan.getStatus()
                    != LoanStatus.ESCALATED_TO_ADMIN){

                throw new AccessDeniedException(
                        "Admin can approve only escalated loans");
            }

            loan.setStatus(
                    LoanStatus.APPROVED);

            loan.setApprovedDate(
                    LocalDateTime.now());

            loan.setApprovedByAdminId(
                    user.getId());
        }

        else{

            throw new AccessDeniedException(
                    "Access Denied");
        }

        loanRepository.save(
                loan);
    }
    public void rejectLoan(
            int loanId,
            int userId,
            String reason){

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid user id"));

        Loan loan =
                getLoanEntityById(
                        loanId);

        if(user.getRole() == Role.EMPLOYEE){

            if(loan.getStatus()
                    != LoanStatus.REQUESTED){

                throw new AccessDeniedException(
                        "Employee can review only REQUESTED loans");
            }

            loan.setStatus(
                    LoanStatus.REJECTED);

            loan.setRejectionReason(
                    reason);

            loan.setVerifiedByEmployeeId(
                    user.getId());
        }

        else if(user.getRole() == Role.ADMIN){

            if(loan.getStatus()
                    != LoanStatus.ESCALATED_TO_ADMIN){

                throw new AccessDeniedException(
                        "Admin can reject only escalated loans");
            }

            loan.setStatus(
                    LoanStatus.REJECTED);

            loan.setRejectionReason(
                    reason);

            loan.setApprovedByAdminId(
                    user.getId());
        }

        else{

            throw new AccessDeniedException(
                    "Access Denied");
        }

        loanRepository.save(
                loan);
    }

    public LoanAmountRespDto getTotalLoanAmountByCustomer(
            int customerId){

        customerRepository.findById(customerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid customer id"));

        Double totalAmount =
                loanRepository
                        .getTotalLoanAmountByCustomer(
                                customerId);

        return new LoanAmountRespDto(
                customerId,
                totalAmount == null ? 0.0 : totalAmount);
    }

    public List<LoanRespDto> searchByCustomerName(
            String customerName){

        List<Loan> loans =
                loanRepository
                        .findByCustomerCustomerNameContainingIgnoreCase(
                                customerName);

        return loans.stream()
                .map(loanMapper::mapEntityToDto)
                .toList();
    }

    public List<LoanRespDto> searchByLoanType(
            LoanType loanType){

        List<Loan> loans =
                loanRepository
                        .findByLoanType(
                                loanType);

        return loans.stream()
                .map(loanMapper::mapEntityToDto)
                .toList();
    }

    public LoanResponseDto getAllWithPagination(int page, int size){
        checkEscalations();
        Pageable pageable = PageRequest.of(page, size);

        Page<Loan> loans =
                loanRepository.findAll(
                        pageable);

        List<LoanRespDto> data =
                loans.getContent()
                        .stream()
                        .map(loanMapper::mapEntityToDto)
                        .toList();

        return new LoanResponseDto(

                data,

                loans.getTotalPages()
        );
    }

    public LoanDashboardDto
    getDashboardStats(){

        long totalLoans =
                loanRepository.count();

        long requestedLoans =
                loanRepository.countByStatus(
                        LoanStatus.REQUESTED);

        long approvedLoans =
                loanRepository.countByStatus(
                        LoanStatus.APPROVED);

        long rejectedLoans =
                loanRepository.countByStatus(
                        LoanStatus.REJECTED);

        return new LoanDashboardDto(

                totalLoans,

                requestedLoans,

                approvedLoans,

                rejectedLoans
        );
    }

    public List<LoanRespDto>
    getLoansByCustomer(
            int customerId){

        List<Loan> loans =
                loanRepository
                        .findByCustomerId(
                                customerId);

        return loans.stream()
                .map(loanMapper::mapEntityToDto)
                .toList();
    }

    public void requestLoanClosure(
            int loanId){

        Loan loan =
                getLoanEntityById(
                        loanId);

        if(loan.getStatus()
                != LoanStatus.APPROVED){

            throw new RuntimeException(
                    "Only approved loans can request closure");
        }

        loan.setStatus(
                LoanStatus.CLOSURE_REQUESTED);

        loanRepository.save(
                loan);
    }

    public LoanResponseDto
    getLoansByEmployeeBranch(

            int userId,

            int page,

            int size){
        checkEscalations();
        Employee employee =
                employeeRepository
                        .findByUserId(userId);

        if(employee == null){

            throw new ResourceNotFoundException(
                    "Employee not found");
        }

        Pageable pageable =
                PageRequest.of(page, size);

        Page<Loan> loans =
                loanRepository
                        .getLoansByBranch(
                                employee.getBranch().getId(),
                                pageable);

        List<LoanRespDto> data =
                loans.getContent()
                        .stream()
                        .map(loanMapper::mapEntityToDto)
                        .toList();

        return new LoanResponseDto(

                data,

                loans.getTotalPages()
        );
    }

    private boolean checkEligibility(
            Customer customer,
            double requestedAmount,
            int tenureMonths){

        double salary =
                customer.getMonthlySalary();

        if(salary == 0)
            return false;

        double maxEligibleLoan =
                salary * tenureMonths * 0.5;

        return requestedAmount
                <= maxEligibleLoan;
    }

    private void checkEscalations(){

        List<Loan> loans =
                loanRepository.findAll();

        for(Loan loan : loans){

            if(loan.getStatus()
                    == LoanStatus.REQUESTED){

                long hours =
                        java.time.Duration
                                .between(
                                        loan.getAppliedDate(),
                                        LocalDateTime.now())
                                .toHours();

                if(hours >= 24){

                    loan.setStatus(
                            LoanStatus.ESCALATED_TO_ADMIN);

                    loanRepository.save(
                            loan);
                }
            }
        }
    }
}