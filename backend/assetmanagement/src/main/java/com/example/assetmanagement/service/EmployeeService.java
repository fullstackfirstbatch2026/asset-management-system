package com.example.assetmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.assetmanagement.entity.Employee;
import com.example.assetmanagement.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee getEmployee(int id) {
        return repository.findById(id).orElse(null);
    }

    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    public void deleteEmployee(int id) {
        repository.deleteById(id);
    }
    
    public int countEmployeeAssets(int employeeId) {
        return repository.countEmployeeAssets(employeeId);
    }
}