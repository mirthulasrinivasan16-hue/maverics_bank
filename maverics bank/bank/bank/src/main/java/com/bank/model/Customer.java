package com.bank.model;

import com.bank.enums.Gender;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "customer_name")
    private String customerName;

    @Column(unique = true)
    private String username;

    private String phone;

    private String address;

    @Column(name = "pan_number", unique = true)
    private String panNumber;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate dob;

    @Column(name="monthly_salary")
    private Double monthlySalary;

    @Column(name = "profile_completed")
    private boolean profileCompleted = false;

    @OneToOne
    private User user;

    @ManyToOne
    private Branch branch;

    @OneToMany(mappedBy = "customer")
    private List<Account> accounts;

    @OneToMany(mappedBy = "customer")
    private List<Loan> loans;

    @OneToMany(mappedBy = "customer")
    private List<Beneficiary> beneficiaries;
}