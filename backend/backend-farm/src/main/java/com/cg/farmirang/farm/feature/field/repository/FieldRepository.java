package com.cg.farmirang.farm.feature.field.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.farmirang.farm.feature.field.entity.Field;

public interface FieldRepository extends JpaRepository<Field, Long> {
}
