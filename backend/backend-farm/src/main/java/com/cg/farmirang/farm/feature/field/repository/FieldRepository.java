package com.cg.farmirang.farm.feature.field.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.farm.feature.field.entity.Field;

@Repository
public interface FieldRepository extends JpaRepository<Field, Long> {
	@EntityGraph(attributePaths = {"member", "design", "iot"})
	Optional<Field> findById(Long id);
}
