package com.example.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.assetmanagement.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query(value = "SELECT CountEmployeeAssets(:employeeId)", nativeQuery = true)
    int countEmployeeAssets(@Param("employeeId") int employeeId);
}