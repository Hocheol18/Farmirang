package com.cg.farmirang.diary.feature.diary.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.farmirang.diary.feature.diary.entity.DiaryManual;
import com.cg.farmirang.diary.feature.diary.entity.DiaryTotal;

public interface DiaryTotalRepository extends JpaRepository<DiaryTotal, Long> {
	Optional<DiaryTotal> findById(Long id);
}
