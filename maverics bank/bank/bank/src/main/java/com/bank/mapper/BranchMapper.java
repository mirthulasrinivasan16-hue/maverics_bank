package com.bank.mapper;

import com.bank.dto.BranchDto;
import com.bank.dto.BranchRespDto;
import com.bank.model.Branch;
import org.springframework.stereotype.Component;

@Component
public class BranchMapper {

    public BranchDto mapEntityToDto(Branch branch){

        return new BranchDto(
                branch.getBranchName(),
                branch.getIfscCode(),
                branch.getCity(),
                branch.getAddress()
        );
    }

    public BranchRespDto mapEntityToRespDto(
            Branch branch){

        return new BranchRespDto(

                branch.getId(),

                branch.getBranchName(),

                branch.getIfscCode(),

                branch.getCity(),

                branch.getAddress()
        );
    }
}