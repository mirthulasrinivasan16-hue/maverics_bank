package com.bank.controller;

import com.bank.dto.*;
import com.bank.enums.LoanType;
import com.bank.exception.ResourceNotFoundException;
import com.bank.service.LoanService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LoanController {

    private final LoanService loanService;

    @GetMapping("/api/loan/all")
    public List<LoanRespDto> getAll() {
        return loanService.getAll();
    }

    @GetMapping("/api/loan/get-one/{id}")
    public ResponseEntity<Object> getById(
            @PathVariable int id) {

        try {

            LoanRespDto loan =
                    loanService.getById(id);

            return ResponseEntity.ok(loan);

        }
        catch (ResourceNotFoundException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/api/loan/add")
    public void addLoan(
            @Valid @RequestBody LoanDto dto) {

        loanService.addLoan(dto);
    }

    @PutMapping("/api/loan/update/{id}")
    public ResponseEntity<Object> update(
            @PathVariable int id,
            @Valid @RequestBody LoanDto dto) {

        try {

            loanService.update(id, dto);

            return ResponseEntity
                    .ok()
                    .build();

        }
        catch (ResourceNotFoundException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/api/loan/delete/{id}")
    public ResponseEntity<Object> deleteById(
            @PathVariable int id) {

        try {

            loanService.deleteById(id);

            return ResponseEntity
                    .ok()
                    .build();

        }
        catch (ResourceNotFoundException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PutMapping("/api/loan/approve/{id}")
    public ResponseEntity<Object>
    approveLoan(
            @PathVariable int id,
            @RequestParam int userId){

        loanService.approveLoan(
                id,
                userId);

        return ResponseEntity
                .ok("Loan approved");
    }

    @PutMapping("/api/loan/reject/{id}")
    public ResponseEntity<Object>
    rejectLoan(
            @PathVariable int id,
            @RequestParam int userId,
            @RequestBody RejectLoanDto dto){

        loanService.rejectLoan(
                id,
                userId,
                dto.reason());

        return ResponseEntity
                .ok("Loan rejected");
    }

    @GetMapping("/api/loan/customer/{customerId}/total-amount")
    public LoanAmountRespDto getTotalLoanAmountByCustomer(
            @PathVariable int customerId){

        return loanService
                .getTotalLoanAmountByCustomer(
                        customerId);
    }

    @GetMapping("/api/loan/search/customer/{customerName}")
    public List<LoanRespDto>
    searchByCustomerName(
            @PathVariable String customerName){

        return loanService
                .searchByCustomerName(
                        customerName);
    }

    @GetMapping("/api/loan/search/type/{loanType}")
    public List<LoanRespDto>
    searchByLoanType(
            @PathVariable LoanType loanType){

        return loanService
                .searchByLoanType(
                        loanType);
    }

    @GetMapping("/api/loan/all/v2")
    public LoanResponseDto getAllV2(

            @RequestParam int page,

            @RequestParam int size){

        return loanService
                .getAllWithPagination(
                        page,
                        size);
    }

    @GetMapping("/api/loan/dashboard")
    public LoanDashboardDto
    getDashboardStats(){

        return loanService
                .getDashboardStats();
    }

    @GetMapping(
            "/api/loan/customer/{customerId}")
    public List<LoanRespDto>
    getLoansByCustomer(
            @PathVariable int customerId){

        return loanService
                .getLoansByCustomer(
                        customerId);
    }

    @PutMapping(
            "/api/loan/request-close/{id}")
    public ResponseEntity<Object>
    requestLoanClosure(
            @PathVariable int id){

        loanService
                .requestLoanClosure(id);

        return ResponseEntity
                .ok("Loan closure requested");
    }

    @GetMapping("/api/loan/employee/{userId}/v2")
    public LoanResponseDto
    getLoansByEmployeeBranch(

            @PathVariable int userId,

            @RequestParam int page,

            @RequestParam int size){

        return loanService
                .getLoansByEmployeeBranch(
                        userId,
                        page,
                        size);
    }
}