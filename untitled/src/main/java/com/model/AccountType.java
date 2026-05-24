package com.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "account_types")
public class AccountType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "type_name")
    private String typeName;

    @Column(name = "minimum_balance")
    private BigDecimal minimumBalance;

    @OneToMany(mappedBy = "accountType")
    private List<Account> accounts;

    public AccountType() {
    }

    public AccountType(int id, String typeName, BigDecimal minimumBalance, List<Account> accounts) {
        this.id = id;
        this.typeName = typeName;
        this.minimumBalance = minimumBalance;
        this.accounts = accounts;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public BigDecimal getMinimumBalance() {
        return minimumBalance;
    }

    public void setMinimumBalance(BigDecimal minimumBalance) {
        this.minimumBalance = minimumBalance;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

    @Override
    public String toString() {
        return "AccountType{" +
                "id=" + id +
                ", typeName='" + typeName + '\'' +
                ", minimumBalance=" + minimumBalance +
                ", accounts=" + accounts +
                '}';
    }
}