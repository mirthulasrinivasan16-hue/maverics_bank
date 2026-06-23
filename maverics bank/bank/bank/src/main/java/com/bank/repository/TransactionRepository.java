package com.bank.repository;

import com.bank.enums.TransactionStatus;
import com.bank.enums.TransactionType;
import com.bank.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository
        extends JpaRepository<Transaction, Integer> {

    @Query("""
            SELECT t
            FROM Transaction t
            LEFT JOIN t.fromAccount fa
            LEFT JOIN t.toAccount ta
            WHERE
            (fa IS NOT NULL AND fa.customer.id = :customerId)
            OR
            (ta IS NOT NULL AND ta.customer.id = :customerId)
            ORDER BY t.transactionDate DESC
            """)
    List<Transaction> getCustomerTransactions(
            @Param("customerId")
            int customerId);

    @Query("""
            SELECT t
            FROM Transaction t
            LEFT JOIN t.fromAccount fa
            LEFT JOIN t.toAccount ta
            WHERE
            (fa IS NOT NULL AND fa.customer.id = :customerId)
            OR
            (ta IS NOT NULL AND ta.customer.id = :customerId)
            """)
    Page<Transaction> getCustomerTransactions(
            @Param("customerId")
            int customerId,
            Pageable pageable);

    @Query("""
            SELECT t
            FROM Transaction t
            LEFT JOIN t.fromAccount fa
            LEFT JOIN t.toAccount ta
            WHERE
            (
            (fa IS NOT NULL AND fa.customer.id = :customerId)
            OR
            (ta IS NOT NULL AND ta.customer.id = :customerId)
            )
            AND
            t.transactionType = :transactionType
            """)
    Page<Transaction> getCustomerTransactionsByType(
            @Param("customerId")
            int customerId,
            @Param("transactionType")
            TransactionType transactionType,
            Pageable pageable);

    @Query("""
            SELECT t
            FROM Transaction t
            LEFT JOIN t.fromAccount fa
            LEFT JOIN t.toAccount ta
            WHERE
            (
            (fa IS NOT NULL AND fa.customer.id = :customerId)
            OR
            (ta IS NOT NULL AND ta.customer.id = :customerId)
            )
            AND
            t.status = :status
            """)
    Page<Transaction> getCustomerTransactionsByStatus(
            @Param("customerId")
            int customerId,
            @Param("status")
            TransactionStatus status,
            Pageable pageable);

    @Query("""
            SELECT t
            FROM Transaction t
            LEFT JOIN t.fromAccount fa
            LEFT JOIN t.toAccount ta
            WHERE
            (
            (fa IS NOT NULL AND fa.customer.id = :customerId)
            OR
            (ta IS NOT NULL AND ta.customer.id = :customerId)
            )
            AND
            t.transactionType = :transactionType
            AND
            t.status = :status
            """)
    Page<Transaction> getCustomerTransactionsByTypeAndStatus(
            @Param("customerId")
            int customerId,
            @Param("transactionType")
            TransactionType transactionType,
            @Param("status")
            TransactionStatus status,
            Pageable pageable);

    @Query("""
            SELECT t
            FROM Transaction t
            LEFT JOIN t.fromAccount fa
            LEFT JOIN t.toAccount ta
            WHERE
            (fa IS NOT NULL AND fa.branch.id = :branchId)
            OR
            (ta IS NOT NULL AND ta.branch.id = :branchId)
            ORDER BY t.transactionDate DESC
            """)
    List<Transaction> getTransactionsByBranch(
            @Param("branchId")
            int branchId);

    Page<Transaction>
    findAll(Pageable pageable);

    Page<Transaction>
    findByTransactionType(
            TransactionType type,
            Pageable pageable);

    Page<Transaction>
    findByStatus(
            TransactionStatus status,
            Pageable pageable);

    Page<Transaction>
    findByTransactionTypeAndStatus(
            TransactionType type,
            TransactionStatus status,
            Pageable pageable);
}