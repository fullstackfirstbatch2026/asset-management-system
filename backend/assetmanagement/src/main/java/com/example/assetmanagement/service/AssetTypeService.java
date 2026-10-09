package com.example.assetmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.assetmanagement.entity.AssetType;
import com.example.assetmanagement.repository.AssetTypeRepository;

@Service
public class AssetTypeService {

    private final AssetTypeRepository repository;

    public AssetTypeService(AssetTypeRepository repository) {
        this.repository = repository;
    }

    public List<AssetType> getAllAssetTypes() {
        return repository.findAll();
    }

    public AssetType getAssetType(int id) {
        return repository.findById(id).orElse(null);
    }

    public AssetType saveAssetType(AssetType assetType) {
        return repository.save(assetType);
    }

    public void deleteAssetType(int id) {
        repository.deleteById(id);
    }
    public List<Object[]> getAssetTypesAboveAverage() {
        return repository.findAssetTypesAboveAverage();
    }
}