package com.bank.controller;

import com.bank.dto.*;
import com.bank.exception.ResourceNotFoundException;
import com.bank.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/api/customer/all")
    public List<CustomerRespDto> getAll() {
        return customerService.getAll();
    }

    @GetMapping("/api/customer/get-one/{id}")
    public ResponseEntity<Object> getById(
            @PathVariable int id) {

        try {

            CustomerRespDto customer = customerService.getById(id);
            return ResponseEntity.ok(customer);

        }
        catch (ResourceNotFoundException e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/api/customer/add")
    public void addCustomer(@RequestBody CustomerDto dto) {

        customerService.addCustomer(dto);
    }

    @PutMapping("/api/customer/update/{id}")
    public ResponseEntity<Object> update(
            @PathVariable int id,
            @RequestBody CustomerDto dto) {

        try {

            customerService.update(id, dto);

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

    @DeleteMapping("/api/customer/delete/{id}")
    public ResponseEntity<Object> deleteById(
            @PathVariable int id) {

        try {

            customerService.deleteById(id);

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

    @PostMapping("/api/customer/signup")
    public ResponseEntity<Object> signup(
            @RequestBody CustomerSignupDto dto){

        customerService.signup(dto);

        return ResponseEntity.ok(
                "Account Created Successfully");
    }

    @PutMapping("/api/customer/complete-profile/{customerId}")
    public ResponseEntity<Object> completeProfile(

            @PathVariable int customerId,

            @RequestBody CompleteProfileDto dto){

        try{

            customerService.completeProfile(
                    customerId,
                    dto);

            return ResponseEntity.ok(
                    "Profile Completed Successfully");
        }
        catch(Exception e){

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/api/customer/search/name/{customerName}")
    public List<CustomerRespDto> searchByName(
            @PathVariable String customerName){

        return customerService.searchByName(customerName);
    }

    @GetMapping(
            "/api/customer/search/username/{username}")
    public CustomerRespDto
    getByUsername(
            @PathVariable String username){

        return customerService
                .getByUsername(username);
    }

    @GetMapping("/api/customer/all/v2")
    public CustomerResponseDto getAllV2(@RequestParam int page, @RequestParam int size){

        return customerService.getAllWithPagination(
                        page,
                        size);
    }

    @PutMapping("/api/customer/update/v2/{id}")
    public ResponseEntity<Object> updateCustomer(

            @PathVariable int id,

            @RequestBody CustomerUpdateDto dto){

        try{

            customerService.updateCustomer(
                    id,
                    dto);

            return ResponseEntity
                    .ok()
                    .build();
        }
        catch(Exception e){

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/api/customer/employee/{userId}/v2")
    public CustomerResponseDto
    getCustomersByEmployeeBranch(

            @PathVariable int userId,

            @RequestParam int page,

            @RequestParam int size){

        return customerService
                .getCustomersByEmployeeBranch(
                        userId,
                        page,
                        size);
    }

    @GetMapping(
            "/api/customer/dashboard/{customerId}")
    public CustomerDashboardDto
    getCustomerDashboard(
            @PathVariable int customerId){

        return customerService
                .getCustomerDashboard(
                        customerId);
    }
}