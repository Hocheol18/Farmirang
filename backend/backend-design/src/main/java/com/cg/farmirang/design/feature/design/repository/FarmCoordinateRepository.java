package com.cg.farmirang.design.feature.design.repository;

import com.cg.farmirang.design.feature.design.entity.FarmCoordinate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmCoordinateRepository extends JpaRepository<FarmCoordinate, Long> {
}
