package com.bank.repository;

import com.bank.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Query("""
           SELECT c
           FROM Customer c
           LEFT JOIN FETCH c.accounts
           WHERE c.id = :customerId
           """)
    Customer getCustomerWithAccounts(@Param("customerId") int customerId);
    Customer findByUserId(int userId);
    @Query("""
       SELECT c
       FROM Customer c
       WHERE c.user.username = :username
       """)
    Customer findByUsername(
            @Param("username")
            String username);
    List<Customer> findByCustomerNameContainingIgnoreCase(String customerName);

    @Query("""
       SELECT c
       FROM Customer c
       WHERE c.branch.id = :branchId
       """)
    Page<Customer> getCustomersByBranch(
            @Param("branchId")
            int branchId, Pageable pageable);

    Optional<Customer> findById(Integer id);



}