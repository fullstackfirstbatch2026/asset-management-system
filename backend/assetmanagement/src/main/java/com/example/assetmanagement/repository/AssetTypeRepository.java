package com.example.assetmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.assetmanagement.entity.AssetType;

public interface AssetTypeRepository extends JpaRepository<AssetType, Integer> {

    @Query(value = """
            SELECT 
                at.asset_type_id,
                at.type_name,
                COUNT(al.allocation_id) AS allocation_count
            FROM asset_types at
            JOIN assets a
                ON at.asset_type_id = a.asset_type_id
            JOIN allocations al
                ON a.asset_id = al.asset_id
            GROUP BY at.asset_type_id, at.type_name
            HAVING COUNT(al.allocation_id) > (
                SELECT AVG(allocation_count)
                FROM (
                    SELECT COUNT(al2.allocation_id) AS allocation_count
                    FROM asset_types at2
                    JOIN assets a2
                        ON at2.asset_type_id = a2.asset_type_id
                    JOIN allocations al2
                        ON a2.asset_id = al2.asset_id
                    GROUP BY at2.asset_type_id
                ) AS average_table
            )
            """, nativeQuery = true)
    List<Object[]> findAssetTypesAboveAverage();
}