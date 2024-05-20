package com.cg.farmirang.diary.feature.diary.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.farmirang.diary.feature.diary.entity.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
	List<Diary> findByFieldIdAndDiaryAtBetween(Long id, LocalDate start, LocalDate end);
	@EntityGraph(attributePaths = {"diaryTotal", "diaryTotal", "diaryAuto"})
	Optional<Diary> findById(Long id);
}
