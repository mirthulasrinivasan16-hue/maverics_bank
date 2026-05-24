package com.config;

import com.model.Account;
import com.model.AccountType;
import com.model.Branch;
import com.model.Customer;
import com.model.User;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateConfig {

    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {

        if(sessionFactory == null){

            Configuration configuration = new Configuration();


            configuration.setProperty("hibernate.connection.url", "jdbc:mysql://localhost:3306/maverics_bank?createDatabaseIfNotExist=true");

            configuration.setProperty("hibernate.connection.username", "root");

            configuration.setProperty("hibernate.connection.password", "mirthudikshi");

            configuration.setProperty("hibernate.connection.driver_class", "com.mysql.cj.jdbc.Driver");

            configuration.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");

            configuration.setProperty("hibernate.hbm2ddl.auto", "update");

            configuration.setProperty("hibernate.show_sql", "false");

            configuration.setProperty("hibernate.format_sql","true");

            configuration.addAnnotatedClass(User.class);
            configuration.addAnnotatedClass(Customer.class);
            configuration.addAnnotatedClass(Account.class);
            configuration.addAnnotatedClass(Branch.class);
            configuration.addAnnotatedClass(AccountType.class);

            sessionFactory = configuration.buildSessionFactory();
        }

        return sessionFactory;
    }

    public static void closeFactory(){

        if(sessionFactory != null){
            sessionFactory.close();
        }
    }
}