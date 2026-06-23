package com.bank.repository;

import com.bank.enums.LoanStatus;
import com.bank.enums.LoanType;
import com.bank.model.Loan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Integer> {

    @Query("""
       SELECT SUM(l.loanAmount)
       FROM Loan l
       WHERE l.customer.id = :customerId
       """)
    Double getTotalLoanAmountByCustomer(
            @Param("customerId")
            int customerId);

    List<Loan> findByLoanType(
            LoanType loanType);

    List<Loan> findByCustomerCustomerNameContainingIgnoreCase(
            String customerName);

    List<Loan> findByCustomerId(int customerId);

    long countByStatus(
            LoanStatus status);
    @Query("""
       SELECT l
       FROM Loan l
       WHERE l.customer.branch.id = :branchId
       """)
    Page<Loan> getLoansByBranch(
            @Param("branchId")
            int branchId, Pageable pageable);

    @Query("""
       SELECT l
       FROM Loan l
       WHERE l.status = 'VERIFIED'
       AND l.appliedDate <= :cutoff
       """)
    List<Loan> getPendingEmployeeReviews(
            @Param("cutoff")
            LocalDateTime cutoff);
    long countByCustomerId(int customerId);
}