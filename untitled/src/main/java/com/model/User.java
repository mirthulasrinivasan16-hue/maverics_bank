package com.model;

import java.time.LocalDateTime;

import com.enums.Role;
import jakarta.persistence.*;

    @Entity
    @Table(name = "users")
    public class User {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        private String username;
        private String email;
        private String password;

        @Enumerated(EnumType.STRING)
        private Role role;

        @Column(name = "created_at")
        private LocalDateTime createdAt;

        @OneToOne
        @JoinColumn(name = "customers_id")
        private Customer customer;

        public User() {
        }

        public User(int id, String username, String email, String password, Role role, LocalDateTime createdAt, Customer customer) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.password = password;
            this.role = role;
            this.createdAt = createdAt;
            this.customer = customer;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public Role getRole() {
            return role;
        }

        public void setRole(Role role) {
            this.role = role;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
        }

        public Customer getCustomer() {
            return customer;
        }

        public void setCustomer(Customer customer) {
            this.customer = customer;
        }

        @Override
        public String toString() {
            return "User{" +
                    "id=" + id +
                    ", username='" + username + '\'' +
                    ", email='" + email + '\'' +
                    ", password='" + password + '\'' +
                    ", role=" + role +
                    ", createdAt=" + createdAt +
                    ", customer=" + customer +
                    '}';
        }
    }
