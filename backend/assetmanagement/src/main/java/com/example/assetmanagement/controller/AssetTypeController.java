package com.example.assetmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.assetmanagement.entity.AssetType;
import com.example.assetmanagement.service.AssetTypeService;

@RestController
@RequestMapping("/asset-types")
@CrossOrigin
public class AssetTypeController {

    private final AssetTypeService service;

    public AssetTypeController(AssetTypeService service) {
        this.service = service;
    }

    @GetMapping
    public List<AssetType> getAllAssetTypes() {
        return service.getAllAssetTypes();
    }
    

    @GetMapping("/{id}")
    public AssetType getAssetType(@PathVariable int id) {
        return service.getAssetType(id);
    }

    @PostMapping
    public AssetType addAssetType(@RequestBody AssetType assetType) {
        return service.saveAssetType(assetType);
    }

    @DeleteMapping("/{id}")
    public String deleteAssetType(@PathVariable int id) {
        service.deleteAssetType(id);
        return "Asset type deleted";
    }
    
    @GetMapping("/above-average")
    public List<Object[]> getAssetTypesAboveAverage() {
        return service.getAssetTypesAboveAverage();
    }
}