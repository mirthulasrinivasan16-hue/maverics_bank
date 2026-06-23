package com.bank.model;

import com.bank.enums.AccountStatus;
import com.bank.enums.AccountType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "account_number", unique = true)
    private String accountNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_type")
    private AccountType accountType;

    private double balance;

    @Enumerated(EnumType.STRING)
    private AccountStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @Column(name = "verified_date")
    private LocalDateTime verifiedDate;

    @Column(name = "approved_date")
    private LocalDateTime approvedDate;

    @Column(name = "rejection_reason")
    private String rejectionReason;

    @Column(name = "verified_by_employee_id")
    private Integer verifiedByEmployeeId;

    @Column(name = "approved_by_admin_id")
    private Integer approvedByAdminId;

    @Column(name = "aadhaar_path")
    private String aadhaarPath;

    @Column(name = "photo_path")
    private String photoPath;

    @JsonIgnore
    @OneToMany(mappedBy = "fromAccount")
    private List<Transaction> sentTransactions;

    @JsonIgnore
    @OneToMany(mappedBy = "toAccount")
    private List<Transaction> receivedTransactions;
}