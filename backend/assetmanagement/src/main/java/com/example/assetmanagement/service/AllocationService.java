package com.example.assetmanagement.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.assetmanagement.entity.Allocation;
import com.example.assetmanagement.repository.AllocationRepository;

@Service
public class AllocationService {

    private final AllocationRepository repository;

    public AllocationService(AllocationRepository repository) {
        this.repository = repository;
    }

    public List<Allocation> getAllAllocations() {
        return repository.findAll();
    }

    public Allocation getAllocation(int id) {
        return repository.findById(id).orElse(null);
    }

    public Allocation saveAllocation(Allocation allocation) {
        return repository.save(allocation);
    }

    public void deleteAllocation(int id) {
        repository.deleteById(id);
    }

    public int countAssetsForEmployee(int employeeId) {
        return repository.countByEmployeeEmployeeId(employeeId);
    }

    public List<Object[]> getAllocatedAssetsWithEmployees() {
        return repository.getAllocatedAssetsWithEmployees();
    }

    @Transactional
    public void allocateAsset(int employeeId, int assetId, LocalDate allocationDate) {
        repository.allocateAsset(employeeId, assetId, allocationDate);
    }
}