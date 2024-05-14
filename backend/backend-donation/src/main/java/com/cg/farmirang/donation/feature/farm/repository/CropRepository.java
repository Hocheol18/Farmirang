package com.cg.farmirang.donation.feature.farm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.donation.feature.farm.entity.Crop;

@Repository
public interface CropRepository extends JpaRepository<Crop, Integer>{
}
