package com.bank.model;

import com.bank.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "employee_id", unique = true)
    private String employeeId;

    @Column(name = "employee_name")
    private String employeeName;

    private String designation;

    private String phone;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;
}