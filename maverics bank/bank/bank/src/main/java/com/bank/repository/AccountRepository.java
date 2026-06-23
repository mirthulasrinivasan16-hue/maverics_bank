package com.bank.repository;

import com.bank.enums.AccountStatus;
import com.bank.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository
        extends JpaRepository<Account, Integer> {

    Account findByAccountNumber(String accountNumber);
    List<Account> findByCustomerId(int customerId);
    @Query("""
       SELECT a
       FROM Account a
       WHERE a.branch.id = :branchId
       """)
    Page<Account> getAccountsByBranch(
            @Param("branchId")
            int branchId, Pageable pageable);
    List<Account>
    findByCustomerIdAndStatus(
            int customerId,
            AccountStatus status);

    long countByCustomerId(int customerId);

}