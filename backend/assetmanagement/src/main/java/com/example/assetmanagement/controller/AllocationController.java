package com.example.assetmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.assetmanagement.entity.Allocation;
import com.example.assetmanagement.service.AllocationService;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/allocations")
@CrossOrigin
public class AllocationController {

    private final AllocationService service;

    public AllocationController(AllocationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Allocation> getAllAllocations() {
        return service.getAllAllocations();
    }

    @GetMapping("/{id}")
    public Allocation getAllocation(@PathVariable int id) {
        return service.getAllocation(id);
    }

    @PostMapping
    public Allocation addAllocation(@RequestBody Allocation allocation) {
        return service.saveAllocation(allocation);
    }

    @DeleteMapping("/{id}")
    public String deleteAllocation(@PathVariable int id) {
        service.deleteAllocation(id);
        return "Allocation deleted";
    }

    @GetMapping("/employee/{employeeId}/count")
    public int countEmployeeAssets(@PathVariable int employeeId) {
        return service.countAssetsForEmployee(employeeId);
    }

    @GetMapping("/join")
    public List<Object[]> getAllocatedAssetsWithEmployees() {
        return service.getAllocatedAssetsWithEmployees();
    }
    
    @PostMapping("/procedure")
    public String allocateAssetUsingProcedure(@RequestBody Map<String, Object> data) {

        int employeeId = Integer.parseInt(data.get("employeeId").toString());
        int assetId = Integer.parseInt(data.get("assetId").toString());
        LocalDate allocationDate = LocalDate.parse(data.get("allocationDate").toString());

        service.allocateAsset(employeeId, assetId, allocationDate);

        return "Asset allocated successfully";
    }
}