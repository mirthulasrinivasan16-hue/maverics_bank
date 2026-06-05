package com.coding.controller;

import com.coding.model.User;
import com.coding.service.UserService;
import com.coding.utility.JwtUtility;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtility jwtUtility;

    @PostMapping("/register")
    public User register(@RequestBody User user){

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userService.save(user);
    }

    @GetMapping("/login")
    public String login(Principal principal){

        String username = principal.getName();

        return jwtUtility.generateToken(username);
    }
}