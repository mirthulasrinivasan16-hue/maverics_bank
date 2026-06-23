package com.bank.repository;

import com.bank.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository
        extends JpaRepository<Employee, Integer> {

    Employee findTopByOrderByIdDesc();

    Employee findByEmployeeId(String employeeId);

    Employee findByUserId(int userId);
}