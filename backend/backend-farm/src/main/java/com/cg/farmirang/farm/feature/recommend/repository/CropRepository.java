package com.cg.farmirang.farm.feature.recommend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.farmirang.farm.feature.recommend.entity.Crop;

public interface CropRepository extends JpaRepository<Crop, Integer> {
	@EntityGraph(attributePaths = {"fertilizer"})
	List<Crop> findByNameIn(List<String> crops);
}
