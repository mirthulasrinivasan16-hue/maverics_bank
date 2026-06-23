package com.bank.model;

import com.bank.enums.LoanStatus;
import com.bank.enums.LoanType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "loans")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "loan_type")
    private LoanType loanType;

    @Column(name = "loan_amount")
    private double loanAmount;

    @Column(name = "interest_rate")
    private double interestRate;

    @Column(name = "tenure_months")
    private Integer tenureMonths;

    @Column(name = "monthly_emi")
    private Double monthlyEmi;

    @Enumerated(EnumType.STRING)
    private LoanStatus status;

    @Column(name = "applied_date")
    private LocalDateTime appliedDate;

    private LocalDateTime escalatedDate;

    @Column(name = "eligibility_remark")
    private String eligibilityRemark;

    @Column(name = "recommended_action")
    private String recommendedAction;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @PrePersist
    public void setAppliedDate() {
        this.appliedDate = LocalDateTime.now();
    }

    @Column(name = "verified_date")
    private LocalDateTime verifiedDate;

    @Column(name = "approved_date")
    private LocalDateTime approvedDate;

    @Column(name = "verified_by_employee_id")
    private Integer verifiedByEmployeeId;

    @Column(name = "approved_by_admin_id")
    private Integer approvedByAdminId;

    @Column(name = "rejection_reason")
    private String rejectionReason;
}