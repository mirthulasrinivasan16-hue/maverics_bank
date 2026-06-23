package com.bank.mapper;

import com.bank.dto.LoanRespDto;
import com.bank.model.Loan;
import org.springframework.stereotype.Component;

@Component
public class LoanMapper {

    public LoanRespDto mapEntityToDto(
            Loan loan){

        return new LoanRespDto(

                loan.getId(),

                loan.getLoanType(),

                loan.getLoanAmount(),

                loan.getInterestRate(),

                loan.getTenureMonths(),

                loan.getMonthlyEmi(),

                loan.getStatus(),

                loan.getAppliedDate(),

                loan.getCustomer()
                        .getCustomerName(),

                loan.getRecommendedAction(),

                loan.getEligibilityRemark()
        );
    }
}