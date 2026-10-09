package com.example.assetmanagement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.assetmanagement.entity.Asset;
import com.example.assetmanagement.service.AssetService;

@RestController
@RequestMapping("/assets")
@CrossOrigin
public class AssetController {

    private final AssetService service;

    public AssetController(AssetService service) {
        this.service = service;
    }

    @GetMapping
    public List<Asset> getAllAssets() {
        return service.getAllAssets();
    }

    @GetMapping("/{id}")
    public Asset getAsset(@PathVariable int id) {
        return service.getAsset(id);
    }

    @PostMapping
    public Asset addAsset(@RequestBody Asset asset) {
        return service.saveAsset(asset);
    }

    @DeleteMapping("/{id}")
    public String deleteAsset(@PathVariable int id) {
        service.deleteAsset(id);
        return "Asset deleted";
    }
}