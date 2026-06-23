package com.bank.controller;

import com.bank.dto.AccountDto;
import com.bank.dto.AccountRespDto;
import com.bank.dto.AccountResponseDto;
import com.bank.dto.RejectAccountDto;
import com.bank.exception.ResourceNotFoundException;
import com.bank.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/api/account/all")
    public List<AccountRespDto> getAll() {

        return accountService.getAll();
    }

    @GetMapping("/api/account/get-one/{id}")
    public ResponseEntity<Object> getById(@PathVariable int id) {

        try {
            AccountRespDto account = accountService.getById(id);
            return ResponseEntity.ok(account);
        }
        catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/api/account/add")
    public void addAccount(@RequestBody AccountDto dto) {
        accountService.addAccount(dto);
    }

    @PutMapping("/api/account/update/{id}")
    public ResponseEntity<Object> update(@PathVariable int id, @RequestBody AccountDto dto) {
        try {
            accountService.update(id, dto);
            return ResponseEntity.ok().build();
        }
        catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/api/account/delete/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable int id) {

        try {
            accountService.deleteById(id);
            return ResponseEntity.ok().build();

        }
        catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/api/account/account-number/{accountNumber}")
    public AccountRespDto getByAccountNumber(@PathVariable String accountNumber){

        return accountService.getByAccountNumber(accountNumber);
    }

    @PutMapping("/api/account/verify/{id}")
    public void verifyAccount(@PathVariable int id, @RequestParam int userId){

        accountService.verifyAccount(id, userId);
    }

    @PutMapping("/api/account/approve/{id}")
    public ResponseEntity<Object> approveAccount(@PathVariable int id, @RequestParam int userId){
        accountService.approveAccount(id,userId);

        return ResponseEntity.ok().body("Account approved");
    }

    @PutMapping("/api/account/reject/{id}")
    public ResponseEntity<Object> rejectAccount(@PathVariable int id, @RequestParam int userId,
            @RequestBody RejectAccountDto dto){
        accountService.rejectAccount(id, userId, dto.reason());

        return ResponseEntity.ok().body("Account rejected");
    }

    @PutMapping("/api/account/close/{id}")
    public ResponseEntity<Object> closeAccount(@PathVariable int id, @RequestParam int userId){
        accountService.closeAccount(id,userId);

        return ResponseEntity.ok().body("Account closed");
    }

    @GetMapping("/api/account/all/v2")
    public AccountResponseDto getAllV2(

            @RequestParam int page,

            @RequestParam int size){

        return accountService.getAllWithPagination(
                page,
                size);
    }

    @GetMapping(
            "/api/account/customer/{customerId}")
    public List<AccountRespDto>
    getAccountsByCustomer(
            @PathVariable int customerId){

        return accountService
                .getAccountsByCustomer(
                        customerId);
    }

    @PutMapping(
            "/api/account/request-close/{id}")
    public ResponseEntity<Object>
    requestAccountClosure(
            @PathVariable int id){

        accountService
                .requestAccountClosure(id);

        return ResponseEntity
                .ok("Closure request submitted");
    }

    @GetMapping(
            "/api/account/employee/{userId}/v2")
    public AccountResponseDto
    getAccountsByEmployeeBranch(

            @PathVariable int userId,

            @RequestParam int page,

            @RequestParam int size){

        return accountService
                .getAccountsByEmployeeBranch(
                        userId,
                        page,
                        size);
    }

    @GetMapping(
            "/api/account/customer/{customerId}/active")
    public List<AccountRespDto>
    getActiveAccountsByCustomer(
            @PathVariable int customerId){

        return accountService
                .getActiveAccountsByCustomer(
                        customerId);
    }

    @PostMapping(
            "/api/account/upload-documents/{id}")
    public void uploadDocuments(

            @PathVariable int id,

            @RequestParam("aadhaar")
            MultipartFile aadhaar,

            @RequestParam("photo")
            MultipartFile photo)

            throws IOException {

        accountService
                .uploadDocuments(
                        id,
                        aadhaar,
                        photo);
    }
}