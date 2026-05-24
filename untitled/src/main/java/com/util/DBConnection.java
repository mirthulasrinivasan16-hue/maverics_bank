package com.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private String url="jdbc:mysql://localhost:3306/maverics_bank";
    private String userDb = "root";
    private String passDB = "mirthudikshi";
    private String driver = "com.mysql.cj.jdbc.Driver";
    private Connection connection;

    public Connection dbConnect() {
        // load the driver
        try {
            Class.forName(driver);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        // establish connection
        try {
            connection =  DriverManager.getConnection(url,userDb,passDB);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return connection;
    }

    public void dbClose(){
        try {
            connection.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}