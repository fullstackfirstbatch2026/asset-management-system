package com.example.assetmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.assetmanagement.entity.Asset;
import com.example.assetmanagement.repository.AssetRepository;

@Service
public class AssetService {

    private final AssetRepository repository;

    public AssetService(AssetRepository repository) {
        this.repository = repository;
    }

    public List<Asset> getAllAssets() {
        return repository.findAll();
    }

    public Asset getAsset(int id) {
        return repository.findById(id).orElse(null);
    }

    public Asset saveAsset(Asset asset) {
        return repository.save(asset);
    }

    public void deleteAsset(int id) {
        repository.deleteById(id);
    }
}
