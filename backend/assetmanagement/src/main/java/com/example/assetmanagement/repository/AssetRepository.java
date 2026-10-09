package com.example.assetmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.assetmanagement.entity.Asset;
import java.util.*;
import org.springframework.data.jpa.repository.Query;
public interface AssetRepository extends JpaRepository<Asset, Integer> {
	@Query(value = """
		    SELECT at.asset_type_id, at.type_name, COUNT(al.allocation_id)
		    FROM asset_types at
		    JOIN assets a ON at.asset_type_id = a.asset_type_id
		    JOIN allocations al ON a.asset_id = al.asset_id
		    GROUP BY at.asset_type_id, at.type_name
		    HAVING COUNT(al.allocation_id) > (
		        SELECT AVG(c)
		        FROM (
		            SELECT COUNT(*) c
		            FROM allocations
		            GROUP BY asset_id
		        ) x
		    )
		    """, nativeQuery = true)
		List<Object[]> findAssetTypesAboveAverage();
}
