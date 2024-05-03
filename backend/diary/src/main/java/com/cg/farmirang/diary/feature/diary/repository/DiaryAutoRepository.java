package com.cg.farmirang.diary.feature.diary.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.farmirang.diary.feature.diary.entity.DiaryAuto;
import com.cg.farmirang.diary.feature.diary.entity.DiaryTotal;

public interface DiaryAutoRepository extends JpaRepository<DiaryAuto, Long> {
	List<DiaryAuto> findByIdIn(List<Long> ids);
}
