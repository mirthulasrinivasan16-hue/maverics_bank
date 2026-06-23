package com.bank.config;

import com.bank.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    @Lazy
    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain
    filterChain(
            HttpSecurity http)
            throws Exception {

        http
                .cors(cors -> {})
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // AUTH
                        .requestMatchers(HttpMethod.GET, "/api/auth/login").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/auth/user-details").authenticated()

                        // BRANCH
                        .requestMatchers(HttpMethod.POST, "/api/branch/add").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/branch/update/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/branch/delete/*").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/branch/all").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/branch/get-one/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/branch/city/{city}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/branch/ifsc/{ifsc}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/branch/all/v2").hasAnyAuthority("ADMIN","EMPLOYEE","CUSTOMER")

                        // USER
                        .requestMatchers(HttpMethod.POST, "/api/user/add").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/user/update/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/user/delete/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/user/all").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/user/get-one/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/user/change-password/{id}").authenticated()

                        // EMPLOYEE
                        .requestMatchers(HttpMethod.POST, "/api/employee/add").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/employee/update/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/employee/delete/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/employee/assign-branch/*").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/employee/all/v2").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/employee/all").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/employee/get-one/*").hasAnyAuthority("ADMIN","EMPLOYEE")

                        // CUSTOMER
                        .requestMatchers(HttpMethod.POST, "/api/customer/add").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/customer/update/{id}").hasAnyAuthority("ADMIN", "EMPLOYEE","CUSTOMER")
                        .requestMatchers(HttpMethod.DELETE, "/api/customer/delete/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/customer/signup").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/customer/all").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/customer/all/v2").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/customer/get-one/{id}").hasAnyAuthority("ADMIN","CUSTOMER","EMPLOYEE")                        .requestMatchers(HttpMethod.PUT, "/api/customer/complete-profile/*").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/customer/search/name/{customerName}").hasAnyAuthority("ADMIN", "EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/customer/search/username/*").hasAnyAuthority("ADMIN","EMPLOYEE","CUSTOMER")
                        .requestMatchers(HttpMethod.PUT, "/api/customer/update/v2/{id}").hasAnyAuthority("ADMIN", "EMPLOYEE","CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/customer/employee/*/v2").hasAnyAuthority("EMPLOYEE","ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/customer/dashboard/*").hasAnyAuthority("CUSTOMER", "ADMIN", "EMPLOYEE")

                        // ACCOUNT
                        .requestMatchers(HttpMethod.POST, "/api/account/add").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/account/verify/{id}").hasAuthority("EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/account/approve/{id}").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/account/reject/{id}").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/account/close/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/account/all/v2").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/account/all").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/account/get-one/{id}").hasAnyAuthority("ADMIN","EMPLOYEE","CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/account/account-number/{accountNumber}").hasAnyAuthority("ADMIN","EMPLOYEE","CUSTOMER")
                        .requestMatchers(HttpMethod.PUT, "/api/account/update/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/account/delete/{id}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/account/customer/*").hasAnyAuthority("CUSTOMER", "ADMIN", "EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/account/request-close/*").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/account/employee/*/v2").hasAnyAuthority("EMPLOYEE","ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/account/customer/{customerId}/active").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "/api/account/upload-documents/*").hasAuthority("CUSTOMER")

                        // LOAN
                        .requestMatchers(HttpMethod.POST, "/api/loan/add").hasAnyAuthority("CUSTOMER","ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/loan/all").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/loan/all/v2").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/loan/get-one/*").hasAnyAuthority("ADMIN","EMPLOYEE","CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/loan/search/customer/*").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/loan/search/type/*").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/loan/dashboard").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/loan/approve/*").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/loan/reject/*").hasAnyAuthority("ADMIN","EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/loan/update/*").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/loan/delete/*").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/loan/customer/*/total-amount").hasAnyAuthority("ADMIN","EMPLOYEE","CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/loan/customer/*").hasAnyAuthority("CUSTOMER", "ADMIN", "EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/loan/request-close/*").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/loan/employee/*/v2").hasAnyAuthority("ADMIN","EMPLOYEE")

                        // BENEFICIARY
                        .requestMatchers(HttpMethod.POST, "/api/beneficiary/add").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/beneficiary/customer/*").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.PUT, "/api/beneficiary/delete/*").hasAuthority("CUSTOMER")

                        // TRANSACTION
                        .requestMatchers(HttpMethod.POST, "/api/transaction/deposit").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "/api/transaction/withdraw").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "/api/transaction/transfer").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/transaction/customer/*").hasAnyAuthority("CUSTOMER", "ADMIN", "EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/transaction/all").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/transaction/all/v2").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/transaction/employee/*").hasAnyAuthority("ADMIN", "EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/transaction/get-one/*").hasAnyAuthority("ADMIN", "EMPLOYEE", "CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/transaction/customer/{customerId}/filter").hasAnyAuthority("ADMIN", "EMPLOYEE", "CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/transaction/customer/*/v2").hasAnyAuthority("CUSTOMER", "ADMIN", "EMPLOYEE")

                        .anyRequest().authenticated()
                );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(
            UserService userService,
            PasswordEncoder passwordEncoder){

        DaoAuthenticationProvider dao = new DaoAuthenticationProvider();

        dao.setUserDetailsService(userService);
        dao.setPasswordEncoder(passwordEncoder);

        return dao;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){

        return org.springframework.security.crypto.password.NoOpPasswordEncoder.getInstance();
    }
}