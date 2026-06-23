package com.bank.service;

import com.bank.enums.Role;
import com.bank.exception.AccessDeniedException;
import com.bank.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthorizationService {

    public void allowAdmin(User user){

        if(user.getRole() != Role.ADMIN){

            throw new AccessDeniedException(
                    "Only admin can perform this action");
        }
    }

    public void allowEmployeeOrAdmin(
            User user){

        if(user.getRole() != Role.ADMIN &&
                user.getRole() != Role.EMPLOYEE){

            throw new AccessDeniedException(
                    "Access denied");
        }
    }

    public void allowCustomer(
            User user){

        if(user.getRole() != Role.CUSTOMER){

            throw new AccessDeniedException(
                    "Only customer can perform this action");
        }
    }
}