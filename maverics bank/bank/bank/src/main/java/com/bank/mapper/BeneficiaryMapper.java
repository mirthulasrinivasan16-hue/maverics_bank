package com.bank.mapper;

import com.bank.dto.BeneficiaryRespDto;
import com.bank.model.Beneficiary;
import org.springframework.stereotype.Component;

@Component
public class BeneficiaryMapper {

    public BeneficiaryRespDto mapEntityToDto(
            Beneficiary beneficiary){

        return new BeneficiaryRespDto(

                beneficiary.getId(),

                beneficiary.getBeneficiaryAccount()
                        .getCustomer()
                        .getCustomerName(),

                beneficiary.getBeneficiaryAccount()
                        .getAccountNumber(),

                beneficiary.getBeneficiaryAccount()
                        .getBranch()
                        .getIfscCode(),

                beneficiary.getBeneficiaryAccount()
                        .getBranch()
                        .getBranchName(),

                beneficiary.getNickname()
        );
    }
}