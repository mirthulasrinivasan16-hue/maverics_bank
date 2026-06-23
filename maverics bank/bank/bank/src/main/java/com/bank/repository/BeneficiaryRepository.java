package com.bank.repository;

import com.bank.model.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeneficiaryRepository
        extends JpaRepository<Beneficiary,Integer> {

    List<Beneficiary> findByCustomerId(
            int customerId);

    boolean existsByCustomerIdAndBeneficiaryAccountId(
            int customerId,
            int accountId);
}