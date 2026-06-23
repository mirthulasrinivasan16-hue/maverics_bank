package com.bank.utility;

import java.util.UUID;

public class PasswordUtility {

    public static String generatePassword(){

        return UUID.randomUUID().toString().substring(0,8);
    }
}