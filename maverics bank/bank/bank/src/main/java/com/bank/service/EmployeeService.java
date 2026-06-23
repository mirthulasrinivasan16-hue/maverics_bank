package com.bank.service;

import com.bank.dto.EmployeeDto;
import com.bank.dto.EmployeeRespDto;
import com.bank.dto.EmployeeResponseDto;
import com.bank.enums.Role;
import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.EmployeeMapper;
import com.bank.model.Branch;
import com.bank.model.Employee;
import com.bank.model.User;
import com.bank.repository.BranchRepository;
import com.bank.repository.EmployeeRepository;
import com.bank.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final BranchRepository branchRepository;
    private final EmployeeMapper employeeMapper;
    private final PasswordEncoder passwordEncoder;
    private final BranchService branchService;

    public List<EmployeeRespDto> getAll() {

        List<Employee> employees =
                employeeRepository.findAll();

        return employees.stream()
                .map(employeeMapper::mapEntityToDto)
                .toList();
    }

    public Employee getEmployeeEntityById(
            int id) {

        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid employee id"));
    }

    public EmployeeRespDto getById(
            int id) {

        Employee employee =
                getEmployeeEntityById(id);

        return employeeMapper
                .mapEntityToDto(employee);
    }

    private String generateEmployeeId() {

        Employee lastEmployee =
                employeeRepository
                        .findTopByOrderByIdDesc();

        if(lastEmployee == null){

            return "EMP0001";
        }

        int number =
                Integer.parseInt(
                        lastEmployee
                                .getEmployeeId()
                                .substring(3)
                );

        number++;

        return String.format(
                "EMP%04d",
                number
        );
    }

    public void addEmployee(
            EmployeeDto dto) {

        if(userRepository.existsByEmail(
                dto.email())){

            throw new ResourceNotFoundException(
                    "Email already exists");
        }

        String employeeId =
                generateEmployeeId();

        User user =
                new User();

        user.setUsername(
                employeeId);

        user.setEmail(
                dto.email());

        user.setPassword(
                passwordEncoder.encode(
                        dto.password()));

        user.setRole(
                Role.EMPLOYEE);

        userRepository.save(user);

        Employee employee =
                new Employee();

        employee.setEmployeeId(
                employeeId);

        employee.setEmployeeName(
                dto.employeeName());

        employee.setDesignation(
                dto.designation());

        employee.setPhone(
                dto.phone());

        employee.setGender(
                dto.gender());

        employee.setJoiningDate(
                dto.joiningDate());

        employee.setUser(
                user);

        employeeRepository.save(
                employee);
    }

    public void update(
            int id,
            EmployeeDto dto) {

        Employee employee =
                getEmployeeEntityById(id);

        User user =
                employee.getUser();

        user.setEmail(
                dto.email());

        if(dto.password() != null
                &&
                !dto.password().isBlank()) {

            user.setPassword(
                    passwordEncoder.encode(
                            dto.password()));
        }

        userRepository.save(user);

        employee.setEmployeeName(
                dto.employeeName());

        employee.setDesignation(
                dto.designation());

        employee.setPhone(
                dto.phone());

        employee.setGender(
                dto.gender());

        employee.setJoiningDate(
                dto.joiningDate());

        employeeRepository.save(
                employee);
    }

    public void deleteById(
            int id) {

        Employee employee =
                getEmployeeEntityById(id);

        User user =
                employee.getUser();

        employeeRepository.delete(
                employee);

        userRepository.delete(
                user);
    }

    public void assignBranch(

            int employeeId,

            int branchId){

        Employee employee =
                employeeRepository
                        .findById(employeeId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Employee not found"));

        Branch branch =
                branchService
                        .getById(branchId);

        employee.setBranch(branch);

        employeeRepository.save(employee);
    }
    public EmployeeResponseDto getAllWithPagination(
            int page,
            int size){

        Pageable pageable =
                PageRequest.of(page,size);

        Page<Employee> pages =
                employeeRepository.findAll(pageable);

        return employeeMapper
                .mapEntityToDto(pages);
    }
}