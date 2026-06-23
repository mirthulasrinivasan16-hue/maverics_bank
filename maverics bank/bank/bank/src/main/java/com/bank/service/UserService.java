package com.bank.service;

import com.bank.dto.LoginResponseDto;
import com.bank.dto.UserDto;
import com.bank.dto.UserPasswordDto;
import com.bank.dto.UserRespDto;
import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.UserMapper;
import com.bank.model.Customer;
import com.bank.model.User;
import com.bank.repository.CustomerRepository;
import com.bank.repository.UserRepository;
import com.bank.utility.PasswordUtility;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final CustomerRepository customerRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            UserMapper userMapper, CustomerRepository customerRepository,
            @Lazy PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserRespDto> getAll() {

        List<User> users =
                userRepository.findAll();

        return users.stream()
                .map(userMapper::mapEntityToDto)
                .toList();
    }

    public User getUserEntityById(int id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid user id"));
    }

    public UserRespDto getById(int id) {

        User user =
                getUserEntityById(id);

        return userMapper
                .mapEntityToDto(user);
    }

    public void addUser(UserDto dto) {

        User user = new User();

        user.setUsername(
                dto.username());

        user.setEmail(
                dto.email());

        String tempPassword = PasswordUtility.generatePassword();

        user.setPassword(passwordEncoder.encode(tempPassword));

        user.setRole(
                dto.role());

        userRepository.save(user);
    }

    public void update(
            int id,
            UserDto dto) {

        User user =
                getUserEntityById(id);

        user.setUsername(
                dto.username());

        user.setEmail(
                dto.email());

        user.setPassword(
                passwordEncoder.encode(
                        dto.password()));

        user.setRole(
                dto.role());

        userRepository.save(user);
    }

    public void deleteById(int id) {

        getUserEntityById(id);

        userRepository.deleteById(id);
    }

    public UserRespDto getByUsername(
            String username){

        User user =
                userRepository
                        .findByUsername(username);

        if(user == null){

            throw new ResourceNotFoundException(
                    "User not found");
        }

        return userMapper
                .mapEntityToDto(user);
    }

    public LoginResponseDto getLoginUserDetails(
            String username){

        User user =
                userRepository
                        .findByUsername(username);

        if(user == null){

            throw new ResourceNotFoundException(
                    "User not found");
        }

        Customer customer =
                customerRepository
                        .findByUserId(
                                user.getId());

        return new LoginResponseDto(

                user.getId(),

                customer != null
                        ? customer.getId()
                        : null,

                user.getUsername(),

                user.getRole().name(),

                customer != null
                        && customer.isProfileCompleted()
        );
    }

    @Override
    public UserDetails loadUserByUsername(
            String username)
            throws UsernameNotFoundException {

        try {

            System.out.println("================================");
            System.out.println("USERNAME RECEIVED : " + username);

            User user =
                    userRepository.findByUsername(username);

            System.out.println("USER OBJECT FOUND");

            if(user == null){
                System.out.println("USER IS NULL");
                throw new UsernameNotFoundException(
                        "User not found");
            }

            System.out.println("USERNAME = " + user.getUsername());
            System.out.println("PASSWORD = " + user.getPassword());
            System.out.println("ROLE = " + user.getRole());

            return new org.springframework.security.core.userdetails.User(

                    user.getUsername(),

                    user.getPassword(),

                    List.of(
                            new SimpleGrantedAuthority(
                                    user.getRole().name()
                            )
                    )
            );
        }
        catch(Exception e){

            System.out.println("EXCEPTION OCCURRED");
            e.printStackTrace();

            throw e;
        }
    }
    public void changePassword(
            int userId,
            UserPasswordDto dto){

        User user =
                getUserEntityById(userId);

        boolean matches =
                passwordEncoder.matches(
                        dto.oldPassword(),
                        user.getPassword());

        if(!matches){

            throw new ResourceNotFoundException(
                    "Old password incorrect");
        }

        user.setPassword(
                passwordEncoder.encode(
                        dto.newPassword()));

        user.setPasswordChanged(
                true);

        userRepository.save(user);

    }

    @PostConstruct
    public void testUser() {

        User user =
                userRepository.findByUsername("admin");

        System.out.println("===============");
        System.out.println("STARTUP TEST");
        System.out.println("USER = " + user);
        System.out.println("===============");
    }

}
