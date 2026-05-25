package com.service;

import com.exception.ResourceNotFoundException;
import com.model.Branch;

import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class BranchService {

    private final Session session;

    public BranchService(Session session) {
        this.session = session;
    }

    public void insert(Branch branch) {

        Transaction tx = session.beginTransaction();

        session.persist(branch);

        tx.commit();
    }

    public void deleteRecord(int id) {

        Transaction tx = session.beginTransaction();

        Branch branch = session.find(Branch.class, id);

        if(branch == null) {

            tx.commit();
            throw new ResourceNotFoundException("Invalid ID given..");
        }

        session.remove(branch);
        tx.commit();
    }

    public List<Branch> getAllBranches() {

        Transaction tx = session.beginTransaction();

        List<Branch> list = session.createQuery("from Branch", Branch.class).list();

        tx.commit();
        return list;
    }

    public Branch getById(int id) {

        Transaction tx = session.beginTransaction();

        Branch branch = session.find(Branch.class, id);
        tx.commit();

        if(branch == null)
            throw new ResourceNotFoundException("Invalid ID given..");

        return branch;
    }
}