package com.bank.service;

import com.bank.dto.BeneficiaryDto;
import com.bank.dto.BeneficiaryRespDto;
import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.BeneficiaryMapper;
import com.bank.model.Account;
import com.bank.model.Beneficiary;
import com.bank.model.Customer;
import com.bank.repository.AccountRepository;
import com.bank.repository.BeneficiaryRepository;
import com.bank.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BeneficiaryService {

    private final BeneficiaryRepository beneficiaryRepository;
    private final CustomerRepository customerRepository;
    private final BeneficiaryMapper beneficiaryMapper;
    private final AccountRepository accountRepository;

    public List<BeneficiaryRespDto> getAll() {

        List<Beneficiary> beneficiaries =
                beneficiaryRepository.findAll();

        return beneficiaries.stream()
                .map(beneficiaryMapper::mapEntityToDto)
                .toList();
    }

    public Beneficiary getBeneficiaryEntityById(
            int id) {

        return beneficiaryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid beneficiary id"));
    }

    public BeneficiaryRespDto getById(int id) {

        Beneficiary beneficiary =
                getBeneficiaryEntityById(id);

        return beneficiaryMapper
                .mapEntityToDto(beneficiary);
    }

    public void addBeneficiary(
            BeneficiaryDto dto){

        Customer customer =
                customerRepository.findById(
                                dto.customerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid customer"));

        Account account =
                accountRepository
                        .findByAccountNumber(
                                dto.accountNumber());

        if(account == null){

            throw new ResourceNotFoundException(
                    "Account not found");
        }

        if(account.getCustomer().getId()
                == customer.getId()){

            throw new RuntimeException(
                    "Cannot add your own account as beneficiary");
        }

        if(beneficiaryRepository
                .existsByCustomerIdAndBeneficiaryAccountId(
                        customer.getId(),
                        account.getId())){

            throw new RuntimeException(
                    "Beneficiary already exists");
        }

        Beneficiary beneficiary =
                new Beneficiary();

        beneficiary.setCustomer(
                customer);

        beneficiary.setBeneficiaryAccount(
                account);

        beneficiary.setNickname(
                dto.nickname());

        beneficiaryRepository.save(
                beneficiary);
    }

    public void deleteById(int id) {

        getBeneficiaryEntityById(id);

        beneficiaryRepository.deleteById(id);
    }

    public List<BeneficiaryRespDto>
    getBeneficiariesByCustomer(
            int customerId){

        return beneficiaryRepository
                .findByCustomerId(
                        customerId)
                .stream()
                .map(beneficiaryMapper::mapEntityToDto)
                .toList();
    }
}