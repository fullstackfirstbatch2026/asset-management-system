package com.example.assetmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.assetmanagement.entity.Employee;
import com.example.assetmanagement.service.EmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable int id) {
        return service.getEmployee(id);
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return service.saveEmployee(employee);
    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable int id) {
        service.deleteEmployee(id);
        return "Employee deleted";
    }
    
    @GetMapping("/{id}/asset-count")
    public int countEmployeeAssets(@PathVariable int id) {
        return service.countEmployeeAssets(id);
    }
}