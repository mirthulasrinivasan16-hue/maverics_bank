package com.bank.controller;

import com.bank.dto.AssignBranchDto;
import com.bank.dto.EmployeeDto;
import com.bank.dto.EmployeeRespDto;
import com.bank.dto.EmployeeResponseDto;
import com.bank.exception.ResourceNotFoundException;
import com.bank.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/api/employee/all")
    public List<EmployeeRespDto> getAll() {
        return employeeService.getAll();
    }

    @GetMapping("/api/employee/get-one/{id}")
    public ResponseEntity<Object> getById(
            @PathVariable int id) {

        try {

            EmployeeRespDto employee =
                    employeeService.getById(id);

            return ResponseEntity.ok(employee);

        }
        catch (ResourceNotFoundException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/api/employee/add")
    public void addEmployee(
            @Valid @RequestBody EmployeeDto dto) {

        employeeService.addEmployee(dto);
    }

    @PutMapping("/api/employee/update/{id}")
    public ResponseEntity<Object> update(
            @PathVariable int id,
            @Valid @RequestBody EmployeeDto dto) {

        try {

            employeeService.update(id, dto);

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

    @DeleteMapping("/api/employee/delete/{id}")
    public ResponseEntity<Object> deleteById(
            @PathVariable int id) {

        try {

            employeeService.deleteById(id);

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

    @PutMapping("/api/employee/assign-branch/{employeeId}")
    public ResponseEntity<Object> assignBranch(

            @PathVariable int employeeId,

            @RequestBody AssignBranchDto dto){
        try{

            employeeService.assignBranch(
                    employeeId,
                    dto.branchId());

            return ResponseEntity.ok(
                    "Branch assigned successfully");
        }
        catch(ResourceNotFoundException e){

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/api/employee/all/v2")
    public EmployeeResponseDto getAllV2(

            @RequestParam int page,

            @RequestParam int size){

        return employeeService
                .getAllWithPagination(
                        page,
                        size);
    }
}