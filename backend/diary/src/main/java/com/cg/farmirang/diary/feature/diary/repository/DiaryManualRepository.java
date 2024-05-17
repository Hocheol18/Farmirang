package com.cg.farmirang.diary.feature.diary.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.farmirang.diary.feature.diary.entity.DiaryManual;

public interface DiaryManualRepository extends JpaRepository<DiaryManual, Long> {
	Optional<DiaryManual> findById(Long id);
	void deleteById(Long id);
}
