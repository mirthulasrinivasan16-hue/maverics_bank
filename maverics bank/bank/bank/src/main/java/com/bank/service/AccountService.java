package com.bank.service;

import com.bank.dto.AccountDto;
import com.bank.dto.AccountRespDto;
import com.bank.dto.AccountResponseDto;
import com.bank.enums.AccountStatus;
import com.bank.enums.Role;
import com.bank.exception.AccessDeniedException;
import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.AccountMapper;
import com.bank.model.*;
import com.bank.repository.*;
import com.bank.utility.FileUtility;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.List;


@Service
@AllArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final CustomerRepository customerRepository;
    private final BranchRepository branchRepository;
    private final AccountMapper accountMapper;
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final String UPLOAD_LOC = "uploads/accounts";

    public List<AccountRespDto> getAll() {

        List<Account> accounts =
                accountRepository.findAll();

        return accounts.stream()
                .map(accountMapper::mapEntityToDto)
                .toList();
    }

    public Account getAccountEntityById(int id) {

        return accountRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid account id"));
    }

    public AccountRespDto getById(int id) {

        Account account =
                getAccountEntityById(id);

        return accountMapper
                .mapEntityToDto(account);
    }

    public void addAccount(AccountDto dto) {

        Customer customer = customerRepository.findById(dto.customerId())
                        .orElseThrow(() -> new ResourceNotFoundException("Invalid customer id"));

        Branch branch = branchRepository.findById(dto.branchId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Invalid branch id"));

        Account account = new Account();

        account.setAccountNumber(null);
        account.setAccountType(dto.accountType());
        account.setBalance(dto.balance());

        account.setStatus(AccountStatus.PENDING);

        account.setCreatedAt(
                LocalDateTime.now());

        account.setCustomer(customer);
        account.setBranch(branch);

        accountRepository.save(account);
    }
    public void update(
            int id,
            AccountDto dto) {

        Account account =
                getAccountEntityById(id);

        Customer customer =
                customerRepository.findById(dto.customerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Invalid customer id"));

        Branch branch =
                branchRepository.findById(dto.branchId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Invalid branch id"));

        account.setAccountNumber(
                dto.accountNumber());

        account.setAccountType(
                dto.accountType());

        account.setBalance(
                dto.balance());

        account.setCustomer(customer);
        account.setBranch(branch);

        accountRepository.save(account);
    }

    public void deleteById(int id) {

        getAccountEntityById(id);

        accountRepository.deleteById(id);
    }

    public AccountRespDto getByAccountNumber(
            String accountNumber){

        Account account =
                accountRepository.findByAccountNumber(
                        accountNumber);

        if(account == null){

            throw new ResourceNotFoundException(
                    "Account not found");
        }

        return accountMapper
                .mapEntityToDto(account);
    }

    public void verifyAccount(
            int accountId,
            int userId){

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid user id"));

        if(user.getRole() != Role.EMPLOYEE){

            throw new AccessDeniedException(
                    "Only employees can verify accounts");
        }

        Account account =
                getAccountEntityById(accountId);

        if(account.getStatus()
                != AccountStatus.PENDING){

            throw new ResourceNotFoundException(
                    "Only requested accounts can be verified");
        }

        account.setStatus(AccountStatus.VERIFIED);
        account.setVerifiedDate(LocalDateTime.now());
        account.setVerifiedByEmployeeId(user.getId());

        accountRepository.save(account);
    }

    public void approveAccount(
            int accountId,
            int userId){

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid user id"));

        if(user.getRole() != Role.ADMIN &&
                user.getRole() != Role.EMPLOYEE){

            throw new AccessDeniedException(
                    "Only admin or employee can approve accounts");
        }

        Account account =
                getAccountEntityById(accountId);

        if(account.getStatus()
                != AccountStatus.VERIFIED){

            throw new ResourceNotFoundException(
                    "Account must be verified first");
        }

        account.setStatus(AccountStatus.ACTIVE);
        account.setApprovedDate(LocalDateTime.now());
        account.setApprovedByAdminId(user.getId());
        if(account.getAccountNumber() == null){
            String accountNumber = "ACC" + System.currentTimeMillis();
            account.setAccountNumber(accountNumber);
        }

        accountRepository.save(account);
    }

    public void rejectAccount(
            int accountId,
            int userId,
            String reason){

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid user id"));

        if(user.getRole() != Role.ADMIN &&
                user.getRole() != Role.EMPLOYEE){

            throw new AccessDeniedException(
                    "Only admin or employee can approve accounts");
        }

        Account account = getAccountEntityById(accountId);

        account.setStatus(AccountStatus.REJECTED);
        account.setRejectionReason(reason);

        accountRepository.save(account);
    }

    public void closeAccount(
            int accountId,
            int userId){

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid user id"));

        if(user.getRole() != Role.ADMIN &&
                user.getRole() != Role.EMPLOYEE){

            throw new AccessDeniedException(
                    "Only admin or employee can close accounts");
        }

        Account account =
                getAccountEntityById(accountId);

        if(account.getStatus()
                != AccountStatus.CLOSURE_REQUESTED){

            throw new ResourceNotFoundException(
                    "Account closure request not submitted");
        }

        account.setStatus(
                AccountStatus.CLOSED);

        accountRepository.save(account);
    }

    public AccountResponseDto getAllWithPagination(

            int page,
            int size){

        Pageable pageable =
                PageRequest.of(page,size);

        Page<Account> accounts =
                accountRepository.findAll(pageable);

        List<AccountRespDto> data =
                accounts.getContent()
                        .stream()
                        .map(accountMapper::mapEntityToDto)
                        .toList();

        return new AccountResponseDto(
                data,
                accounts.getTotalPages()
        );
    }

    public List<AccountRespDto>
    getAccountsByCustomer(int customerId){

        List<Account> accounts =
                accountRepository
                        .findByCustomerId(
                                customerId);

        return accounts.stream()
                .map(accountMapper::mapEntityToDto)
                .toList();
    }

    public void requestAccountClosure(
            int accountId){

        Account account =
                getAccountEntityById(
                        accountId);

        if(account.getStatus()
                != AccountStatus.ACTIVE){

            throw new RuntimeException(
                    "Only active accounts can be closed");
        }

        account.setStatus(
                AccountStatus.CLOSURE_REQUESTED);

        accountRepository.save(
                account);
    }

    public AccountResponseDto
    getAccountsByEmployeeBranch(

            int userId,

            int page,

            int size){

        Employee employee =
                employeeRepository
                        .findByUserId(userId);

        if(employee == null){

            throw new ResourceNotFoundException(
                    "Employee not found");
        }

        Pageable pageable =
                PageRequest.of(page, size);

        Page<Account> accounts =
                accountRepository
                        .getAccountsByBranch(
                                employee.getBranch().getId(),
                                pageable);

        List<AccountRespDto> data =
                accounts.getContent()
                        .stream()
                        .map(accountMapper::mapEntityToDto)
                        .toList();

        return new AccountResponseDto(

                data,

                accounts.getTotalPages()
        );
    }

    public List<AccountRespDto>
    getActiveAccountsByCustomer(
            int customerId){

        return accountRepository
                .findByCustomerIdAndStatus(
                        customerId,
                        AccountStatus.ACTIVE)
                .stream()
                .map(accountMapper::mapEntityToDto)
                .toList();
    }

    public void uploadDocuments(

            int accountId,

            MultipartFile aadhaar,

            MultipartFile photo)

            throws IOException {

        Account account =
                getAccountEntityById(
                        accountId);

        FileUtility.validateFile(
                aadhaar);

        FileUtility.validateFile(
                photo);

        Path uploadPath =
                Paths.get(
                        UPLOAD_LOC);

        Files.createDirectories(
                uploadPath);

        String aadhaarFileName =
                System.currentTimeMillis()
                        + "_"
                        + aadhaar.getOriginalFilename();

        String photoFileName =
                System.currentTimeMillis()
                        + "_"
                        + photo.getOriginalFilename();

        Files.copy(

                aadhaar.getInputStream(),

                uploadPath.resolve(
                        aadhaarFileName),

                StandardCopyOption.REPLACE_EXISTING
        );

        Files.copy(

                photo.getInputStream(),

                uploadPath.resolve(
                        photoFileName),

                StandardCopyOption.REPLACE_EXISTING
        );

        account.setAadhaarPath(
                aadhaarFileName);

        account.setPhotoPath(
                photoFileName);

        accountRepository.save(
                account);
    }
}