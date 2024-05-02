package com.cg.farmirang.diary.feature.diary.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.farmirang.diary.feature.diary.entity.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
	List<Diary> findByFieldIdAndDiaryAtBetween(Long id, LocalDate start, LocalDate end);
}
