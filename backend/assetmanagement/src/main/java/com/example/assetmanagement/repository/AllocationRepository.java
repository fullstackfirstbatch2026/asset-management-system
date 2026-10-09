package com.example.assetmanagement.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.assetmanagement.entity.Allocation;

public interface AllocationRepository extends JpaRepository<Allocation, Integer> {

    int countByEmployeeEmployeeId(int employeeId);

    @Query(value = """
            SELECT 
                e.employee_id,
                e.employee_name,
                e.department,
                a.asset_id,
                a.asset_name,
                a.serial_number,
                al.allocation_date
            FROM allocations al
            JOIN employees e
                ON al.employee_id = e.employee_id
            JOIN assets a
                ON al.asset_id = a.asset_id
            """, nativeQuery = true)
    List<Object[]> getAllocatedAssetsWithEmployees();

    @Modifying
    @Query(value = "CALL AllocateAsset(:employeeId, :assetId, :allocationDate)", nativeQuery = true)
    void allocateAsset(
            @Param("employeeId") int employeeId,
            @Param("assetId") int assetId,
            @Param("allocationDate") LocalDate allocationDate
    );
}