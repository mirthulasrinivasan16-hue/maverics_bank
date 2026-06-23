package com.bank.service;

import com.bank.dto.BranchRespDto;
import com.bank.dto.BranchResponseDto;
import com.bank.enums.BranchStatus;
import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.BranchMapper;
import com.bank.model.Branch;
import com.bank.repository.BranchRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BranchService {

    private final BranchRepository branchRepository;
    private final BranchMapper branchMapper;

    public List<Branch> getAll() {
        return branchRepository.findAll();
    }

    public Branch getById(int id) {

        return branchRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid branch id"));

    }

    public void addBranch(Branch branch) {

        branch.setStatus(BranchStatus.ACTIVE);
        branchRepository.save(branch);
    }

    public void update(int id, Branch updatedBranch) {

        Branch existingBranch = getById(id);

        existingBranch.setBranchName(updatedBranch.getBranchName());
        existingBranch.setIfscCode(updatedBranch.getIfscCode());
        existingBranch.setCity(updatedBranch.getCity());
        existingBranch.setAddress(updatedBranch.getAddress());

        branchRepository.save(existingBranch);
    }

    public void deleteById(int id) {

        getById(id); // validation

        branchRepository.deleteById(id);
    }

    public Branch getByIfsc(String ifscCode) {

        Branch branch = branchRepository.findByIfscCode(ifscCode);

        if(branch == null) {
            throw new ResourceNotFoundException(
                    "Branch not found with IFSC: " + ifscCode);
        }

        return branch;
    }

    public List<Branch> getByCity(String city) {

        List<Branch> branches = branchRepository.findByCity(city);

        if(branches.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No branches found in city: " + city);
        }

        return branches;
    }

    public void deactivateBranch(int id){

        Branch branch = getById(id);
        branch.setStatus(BranchStatus.INACTIVE);

        branchRepository.save(branch);
    }

    public void activateBranch(int id){

        Branch branch = getById(id);
        branch.setStatus(BranchStatus.ACTIVE);

        branchRepository.save(branch);
    }

    public BranchResponseDto getAllWithPagination(

            int page,

            int size){

        Pageable pageable =
                PageRequest.of(
                        page,
                        size);

        Page<Branch> pageBranch =
                branchRepository.findAll(
                        pageable);

        List<BranchRespDto> branchList =
                pageBranch
                        .getContent()
                        .stream()
                        .map(branchMapper::mapEntityToRespDto)
                        .toList();

        return new BranchResponseDto(

                pageBranch.getTotalElements(),

                pageBranch.getTotalPages(),
                branchList
        );
    }
}