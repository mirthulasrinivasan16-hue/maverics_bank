package com.controller;

import com.config.HibernateConfig;
import com.exception.ResourceNotFoundException;
import com.model.Branch;
import com.service.BranchService;

import org.hibernate.Session;

import java.util.List;
import java.util.Scanner;

public class MainClass {

    public static void main(String[] args) {

        HibernateConfig.getSessionFactory();

        System.out.println("Works");

        Session session =
                HibernateConfig
                        .getSessionFactory()
                        .openSession();

        Scanner sc = new Scanner(System.in);

        BranchService branchService =
                new BranchService(session);

        while(true){

            System.out.println("1. Add Branch");
            System.out.println("2. Delete Branch by id");
            System.out.println("3. Fetch all Branches");
            System.out.println("4. Update Branch");
            System.out.println("0. Exit ");

            int op = sc.nextInt();

            if(op == 0)
                break;

            switch(op){

                case 1:

                    Branch branch = new Branch();

                    sc.nextLine();

                    System.out.print("Enter Branch Name: ");
                    branch.setBranchName(sc.nextLine());

                    System.out.print("Enter IFSC Code: ");
                    branch.setIfscCode(sc.nextLine());

                    System.out.print("Enter City: ");
                    branch.setCity(sc.nextLine());

                    System.out.print("Enter Address: ");
                    branch.setAddress(sc.nextLine());

                    branchService.insert(branch);

                    System.out.println("Branch Added");

                    break;

                case 2:

                    System.out.println("Enter Branch ID to delete record ");

                    int id = sc.nextInt();

                    branchService.deleteRecord(id);

                    System.out.println("Record deleted");

                    break;

                case 3:

                    System.out.println("----------All Branches----------");

                    List<Branch> list =
                            branchService.getAllBranches();

                    list.forEach(System.out::println);

                    break;
                case 4:

                    System.out.println("Enter the branch id to update");

                    id = sc.nextInt();

                    try{

                        branch = branchService.getById(id);

                        // this comes from DB

                        System.out.println("Existing branch record " + branch);

                        sc.nextLine();

                        System.out.println("Enter Branch Name: ");
                        branch.setBranchName(sc.nextLine());

                        System.out.println("Enter IFSC Code: ");
                        branch.setIfscCode(sc.nextLine());

                        System.out.println("Enter City: ");
                        branch.setCity(sc.nextLine());

                        System.out.println("Enter Address: ");
                        branch.setAddress(sc.nextLine());

                        branchService.insert(branch);

                        System.out.println("Branch Updated");
                    }

                    catch (ResourceNotFoundException e){

                        System.out.println(e.getMessage());
                    }

                    break;

                default:

                    System.out.println("invalid option. try again");

                    break;
            }
        }

        sc.close();

        session.close();
    }
}