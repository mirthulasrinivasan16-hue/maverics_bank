// src/utils/auth.js

export const getCustomerId = () =>
    localStorage.getItem("customerId");

export const getToken = () =>
    localStorage.getItem("token");

export const getUsername = () =>
    localStorage.getItem("username");