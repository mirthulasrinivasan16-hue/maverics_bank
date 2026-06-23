package com.bank.controller;

import com.bank.dto.LoginResponseDto;
import com.bank.dto.TokenDto;
import com.bank.model.User;
import com.bank.service.UserService;
import com.bank.utility.JwtUtility;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UserService userService;
    private final JwtUtility jwtUtility;

    @GetMapping("/login")
    public TokenDto login(
            Principal principal){

        String username =
                principal.getName();

        String token =
                jwtUtility.generateToken(
                        username);

        return new TokenDto(
                username,
                token
        );
    }

    @GetMapping("/user-details")
    public LoginResponseDto getUserDetails(
            Principal principal){

        return userService
                .getLoginUserDetails(
                        principal.getName());
    }
}