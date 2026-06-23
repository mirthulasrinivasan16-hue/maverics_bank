package com.bank.controller;

import com.bank.dto.UserDto;
import com.bank.dto.UserPasswordDto;
import com.bank.dto.UserRespDto;
import com.bank.exception.ResourceNotFoundException;
import com.bank.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @GetMapping("/api/user/all")
    public List<UserRespDto> getAll() {
        return userService.getAll();
    }

    @GetMapping("/api/user/get-one/{id}")
    public ResponseEntity<Object> getById(
            @PathVariable int id) {

        try {

            UserRespDto user =
                    userService.getById(id);

            return ResponseEntity.ok(user);

        }
        catch (ResourceNotFoundException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/api/user/add")
    public void addUser(
            @Valid @RequestBody UserDto dto) {

        userService.addUser(dto);
    }

    @PutMapping("/api/user/update/{id}")
    public ResponseEntity<Object> update(
            @PathVariable int id,
            @Valid @RequestBody UserDto dto) {

        try {

            userService.update(id, dto);

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

    @DeleteMapping("/api/user/delete/{id}")
    public ResponseEntity<Object> deleteById(
            @PathVariable int id) {

        try {

            userService.deleteById(id);

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

    @GetMapping("/api/user/username/{username}")
    public UserRespDto getByUsername(
            @PathVariable String username){

        return userService
                .getByUsername(username);
    }

    @PutMapping("/api/user/change-password/{id}")
    public ResponseEntity<Object>
    changePassword(

            @PathVariable int id,

            @RequestBody
            UserPasswordDto dto){

        userService.changePassword(id, dto);

        return ResponseEntity.ok("Password changed");
    }
}