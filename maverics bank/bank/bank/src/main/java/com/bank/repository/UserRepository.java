package com.bank.repository;

import com.bank.enums.Role;
import com.bank.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository
        extends JpaRepository<User, Integer> {

    User findByUsername(String username);

    User findByEmail(String email);

    boolean existsByRole(Role role);

    boolean existsByEmail(String email);
}