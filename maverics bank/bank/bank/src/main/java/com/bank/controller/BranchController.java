package com.bank.controller;

import com.bank.dto.BranchResponseDto;
import com.bank.exception.ResourceNotFoundException;
import com.bank.model.Branch;
import com.bank.service.BranchService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BranchController {

    private final BranchService branchService;

    @GetMapping("/api/branch/all")
    public List<Branch> getAll() {
        return branchService.getAll();
    }

    @GetMapping("/api/branch/get-one/{id}")
    public ResponseEntity<Object> getById(@PathVariable int id) {
        try {
            Branch branch = branchService.getById(id);
            return ResponseEntity
                    .ok(branch);
        }
        catch (ResourceNotFoundException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/api/branch/add")
    public void addBranch(@RequestBody Branch branch) {
        branchService.addBranch(branch);
    }

    @PutMapping("/api/branch/update/{id}")
    public ResponseEntity<Object> update(
            @PathVariable int id,
            @RequestBody Branch updatedBranch) {
        try {
            branchService.update(id, updatedBranch);
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

    @DeleteMapping("/api/branch/delete/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable int id) {
        try {
            branchService.deleteById(id);
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

    @GetMapping("/api/branch/ifsc/{ifscCode}")
    private Branch getByIfsc(@PathVariable String ifscCode){

        return branchService.getByIfsc(ifscCode);
    }

    @GetMapping("/api/branch/city/{city}")
    private List<Branch> getByCity(@PathVariable String city) {

        return branchService.getByCity(city);
    }

    @PutMapping("/api/branch/deactivate/{id}")
    public void deactivateBranch(@PathVariable int id){

        branchService.deactivateBranch(id);
    }

    @PutMapping("/api/branch/activate/{id}")
    public void activateBranch(@PathVariable int id){

        branchService.activateBranch(id);
    }

    @GetMapping("/api/branch/all/v2")
    public BranchResponseDto getAllV2(

            @RequestParam int page,

            @RequestParam int size){

        return branchService
                .getAllWithPagination(
                        page,
                        size);
    }
}