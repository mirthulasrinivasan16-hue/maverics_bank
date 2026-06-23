package com.bank.service;

import com.bank.dto.*;
import com.bank.enums.Role;
import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.CustomerMapper;
import com.bank.model.*;
import com.bank.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final BranchRepository branchRepository;
    private final CustomerMapper customerMapper;
    private final EmployeeRepository employeeRepository;

    public List<CustomerRespDto> getAll() {

        List<Customer> customers = customerRepository.findAll();
        return customers.stream().map(customerMapper::mapEntityToDto).toList();
    }

    public Page<CustomerRespDto> getAllPaginated(
            int page,
            int size){

        Pageable pageable =
                PageRequest.of(page,size);

        Page<Customer> customers =
                customerRepository.findAll(pageable);

        return customers.map(
                customerMapper::mapEntityToDto);
    }
    public Customer getCustomerEntityById(int id) {

        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid customer id"));
    }

    public CustomerRespDto getById(int id) {

        Customer customer =
                customerRepository
                        .getCustomerWithAccounts(id);

        if(customer == null){

            throw new ResourceNotFoundException(
                    "Invalid customer id");
        }

        return customerMapper
                .mapEntityToDto(customer);
    }

    public void addCustomer(CustomerDto dto) {

        User user =
                userRepository.findById(dto.userId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid user id"));

        Branch branch =
                branchRepository.findById(dto.branchId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid branch id"));

        Customer customer = new Customer();

        customer.setCustomerName(dto.customerName());
        customer.setPhone(dto.phone());
        customer.setAddress(dto.address());
        customer.setPanNumber(dto.panNumber());
        customer.setGender(dto.gender());
        customer.setDob(dto.dob());

        customer.setUser(user);
        customer.setBranch(branch);

        customerRepository.save(customer);
    }

    public void update(
            int id,
            CustomerDto dto) {

        Customer customer =
                getCustomerEntityById(id);

        User user =
                userRepository.findById(dto.userId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid user id"));

        Branch branch =
                branchRepository.findById(dto.branchId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid branch id"));

        customer.setCustomerName(dto.customerName());
        customer.setPhone(dto.phone());
        customer.setAddress(dto.address());
        customer.setPanNumber(dto.panNumber());
        customer.setGender(dto.gender());
        customer.setDob(dto.dob());

        customer.setUser(user);
        customer.setBranch(branch);

        customerRepository.save(customer);
    }

    public void deleteById(int id) {

        getCustomerEntityById(id);

        customerRepository.deleteById(id);
    }

    public void signup(
            CustomerSignupDto dto){

        User existingUsername =
                userRepository.findByUsername(
                        dto.username());

        if(existingUsername != null){

            throw new RuntimeException(
                    "Username already exists");
        }

        User user = new User();

        user.setUsername(
                dto.username());

        user.setEmail(
                dto.email());

        user.setPassword(
                dto.password());

        user.setRole(
                Role.CUSTOMER);

        userRepository.save(
                user);

        Customer customer =
                new Customer();

        customer.setCustomerName(
                dto.customerName());

        customer.setPhone(
                dto.phone());

        customer.setUser(
                user);

        customerRepository.save(
                customer);
    }

    public void completeProfile(

            int customerId,

            CompleteProfileDto dto){

        Customer customer =
                customerRepository
                        .findById(customerId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid Customer Id"));

        Branch branch =
                branchRepository
                        .findById(dto.branchId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid Branch Id"));

        customer.setAddress(
                dto.address());

        customer.setPanNumber(
                dto.panNumber());

        customer.setGender(
                dto.gender());

        customer.setDob(
                dto.dob());

        customer.setBranch(
                branch);

        customer.setProfileCompleted(
                true);

        customerRepository.save(
                customer);
    }

    public List<CustomerRespDto> searchByName(String customerName){

        List<Customer> customers =
                customerRepository
                        .findByCustomerNameContainingIgnoreCase(customerName);

        return customers.stream()
                .map(customerMapper::mapEntityToDto)
                .toList();
    }

    public CustomerRespDto
    getByUsername(String username){

        Customer customer =
                customerRepository
                        .findByUsername(
                                username);

        if(customer == null){

            throw new ResourceNotFoundException(
                    "Customer not found");
        }

        return customerMapper
                .mapEntityToDto(customer);
    }

    public CustomerResponseDto getAllWithPagination(

            int page,

            int size){

        Pageable pageable =
                PageRequest.of(page,size);

        Page<Customer> customers =
                customerRepository.findAll(pageable);

        List<CustomerRespDto> data =
                customers.getContent()
                        .stream()
                        .map(customerMapper::mapEntityToDto)
                        .toList();

        return new CustomerResponseDto(

                data,

                customers.getTotalPages()
        );
    }

    public void updateCustomer(
            int id,
            CustomerUpdateDto dto){

        Customer customer =
                getCustomerEntityById(id);

        if(dto.phone() != null &&
                !dto.phone().isBlank()){

            customer.setPhone(
                    dto.phone());
        }

        if(dto.address() != null &&
                !dto.address().isBlank()){

            customer.setAddress(
                    dto.address());
        }

        customerRepository.save(
                customer);
    }
    public CustomerResponseDto
    getCustomersByEmployeeBranch(

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

        Page<Customer> customers =
                customerRepository
                        .getCustomersByBranch(
                                employee.getBranch().getId(),
                                pageable);

        List<CustomerRespDto> data =
                customers.getContent()
                        .stream()
                        .map(customerMapper::mapEntityToDto)
                        .toList();

        return new CustomerResponseDto(

                data,

                customers.getTotalPages()
        );
    }

    public CustomerDashboardDto
    getCustomerDashboard(int customerId){

        Customer customer =
                customerRepository.findById(customerId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid customer id"));

        int totalAccounts =
                (int) accountRepository
                        .countByCustomerId(customerId);

        int totalLoans =
                (int) loanRepository
                        .countByCustomerId(customerId);

        double availableBalance =
                accountRepository
                        .findByCustomerId(customerId)
                        .stream()
                        .filter(account ->
                                account.getStatus().name()
                                        .equals("ACTIVE"))
                        .mapToDouble(Account::getBalance)
                        .sum();

        String branchName =
                customer.getBranch() != null
                        ? customer.getBranch().getBranchName()
                        : "-";

        return new CustomerDashboardDto(

                totalAccounts,

                totalLoans,

                branchName,

                availableBalance
        );
    }
}