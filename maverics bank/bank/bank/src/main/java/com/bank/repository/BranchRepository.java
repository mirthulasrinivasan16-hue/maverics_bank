package com.bank.repository;

import com.bank.model.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchRepository extends JpaRepository<Branch,Integer> {
    Branch findByIfscCode(String ifscCode);
    List<Branch> findByCity(String city);
}
