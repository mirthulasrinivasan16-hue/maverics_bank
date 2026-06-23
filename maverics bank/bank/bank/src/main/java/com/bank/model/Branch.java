package com.bank.model;

import com.bank.enums.BranchStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "branches")
public class Branch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "branch_name")
    private String branchName;

    @Column(name = "ifsc_code", unique = true)
    private String ifscCode;

    private String city;

    private String address;

    @Enumerated(EnumType.STRING)
    private BranchStatus status;

    @JsonIgnore
    @OneToMany(mappedBy = "branch")
    private List<Customer> customers;

    @JsonIgnore
    @OneToMany(mappedBy = "branch")
    private List<Employee> employees;

    @JsonIgnore
    @OneToMany(mappedBy = "branch")
    private List<Account> accounts;
}