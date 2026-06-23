package com.bank.controller;

import com.bank.dto.BeneficiaryDto;
import com.bank.dto.BeneficiaryRespDto;
import com.bank.exception.ResourceNotFoundException;
import com.bank.service.BeneficiaryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BeneficiaryController {

    private final BeneficiaryService beneficiaryService;

    @GetMapping("/api/beneficiary/all")
    public List<BeneficiaryRespDto> getAll() {
        return beneficiaryService.getAll();
    }

    @GetMapping("/api/beneficiary/get-one/{id}")
    public ResponseEntity<Object> getById(
            @PathVariable int id) {

        try {

            BeneficiaryRespDto beneficiary =
                    beneficiaryService.getById(id);

            return ResponseEntity
                    .ok(beneficiary);

        }
        catch (ResourceNotFoundException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/api/beneficiary/add")
    public void addBeneficiary(
            @Valid @RequestBody BeneficiaryDto dto) {

        beneficiaryService.addBeneficiary(dto);
    }

    @DeleteMapping("/api/beneficiary/delete/{id}")
    public ResponseEntity<Object> deleteById(
            @PathVariable int id) {

        try {

            beneficiaryService.deleteById(id);

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

    @GetMapping("/api/beneficiary/customer/{customerId}")
    public List<BeneficiaryRespDto>
    getByCustomer(
            @PathVariable int customerId){

        return beneficiaryService
                .getBeneficiariesByCustomer(
                        customerId);
    }
}