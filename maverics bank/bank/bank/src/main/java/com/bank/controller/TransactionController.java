package com.bank.controller;

import com.bank.dto.*;
import com.bank.enums.TransactionStatus;
import com.bank.enums.TransactionType;
import com.bank.exception.ResourceNotFoundException;
import com.bank.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping("/api/transaction/all")
    public List<TransactionRespDto> getAll() {

        return transactionService.getAll();
    }

    @GetMapping("/api/transaction/get-one/{id}")
    public ResponseEntity<Object> getById(
            @PathVariable int id) {

        try {

            return ResponseEntity.ok(
                    transactionService.getById(id));

        }
        catch(ResourceNotFoundException e){

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/api/transaction/deposit")
    public ResponseEntity<Object> deposit(
            @RequestBody DepositDto dto){

        transactionService.deposit(
                dto.accountId(),
                dto.amount());

        return ResponseEntity.ok(
                "Amount deposited successfully");
    }

    @PostMapping("/api/transaction/withdraw")
    public ResponseEntity<Object> withdraw(
            @RequestBody WithdrawDto dto){

        transactionService.withdraw(
                dto.accountId(),
                dto.amount());

        return ResponseEntity.ok(
                "Amount withdrawn successfully");
    }

    @PostMapping("/api/transaction/transfer")
    public ResponseEntity<Object> transfer(
            @RequestBody FundTransferDto dto){

        transactionService.transfer(dto);

        return ResponseEntity.ok(
                "Transfer successful");
    }

    @GetMapping("/api/transaction/customer/{customerId}")
    public List<TransactionRespDto>
    getTransactionsByCustomer(
            @PathVariable int customerId){

        return transactionService
                .getTransactionsByCustomer(
                        customerId);
    }

    @GetMapping("/api/transaction/employee/{userId}")
    public List<TransactionRespDto>
    getTransactionsByEmployeeBranch(
            @PathVariable int userId){

        return transactionService
                .getTransactionsByEmployeeBranch(
                        userId);
    }

    @GetMapping("/api/transaction/customer/{customerId}/v2")
    public TransactionResponseDto
    getTransactionsByCustomerV2(

            @PathVariable int customerId,

            @RequestParam int page,

            @RequestParam int size,

            @RequestParam(required = false)
            TransactionType type,

            @RequestParam(required = false)
            TransactionStatus status){

        return transactionService
                .getTransactionsByCustomerV2(
                        customerId,
                        page,
                        size,
                        type,
                        status);
    }

    @GetMapping("/api/transaction/all/v2")
    public TransactionResponseDto
    getAllTransactionsV2(

            @RequestParam int page,

            @RequestParam int size,

            @RequestParam(required = false)
            TransactionType type,

            @RequestParam(required = false)
            TransactionStatus status){

        return transactionService
                .getAllTransactionsV2(
                        page,
                        size,
                        type,
                        status);
    }
}