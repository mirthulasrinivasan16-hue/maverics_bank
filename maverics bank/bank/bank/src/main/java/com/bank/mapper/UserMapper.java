package com.bank.mapper;

import com.bank.dto.LoginResponseDto;
import com.bank.dto.UserRespDto;
import com.bank.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserRespDto mapEntityToDto(
            User user){

        return new UserRespDto(

                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.isPasswordChanged()

        );
    }

    public LoginResponseDto mapEntityToLoginResponseDto(
            User user){

        return new LoginResponseDto(

                user.getId(),

                null,

                user.getUsername(),

                user.getRole().name(),

                false
        );
    }
}