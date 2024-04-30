package com.cg.farmirang.diary.feature.diary.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cg.farmirang.diary.feature.diary.dto.request.CreateDiaryMRequest;
import com.cg.farmirang.diary.feature.diary.dto.request.ModifyDiaryMRequest;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryAResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryMResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryTotal;
import com.cg.farmirang.diary.feature.diary.dto.response.MakeCalendarResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class DiaryServiceImpl implements DiaryService {

	@Override
	public Boolean insertDiaryManual(CreateDiaryMRequest request) {
		return null;
	}

	@Override
	public GetDiaryMResponse selectDiaryManual(Long fieldID, Integer month, Integer day) {
		return null;
	}

	@Override
	public Boolean deleteDiaryManual(Long fieldID, Integer month, Integer day) {
		return null;
	}

	@Override
	public Boolean updateDiaryManual(Long fieldID, Integer month, Integer day, ModifyDiaryMRequest request) {
		return null;
	}

	@Override
	public GetDiaryAResponse selectDiaryAuto(Long fieldID, Integer month, Integer day) {
		return null;
	}

	@Override
	public GetDiaryTotal selectDiaryTotal(Long fieldID, Integer month, Integer day) {
		return null;
	}

	@Override
	public MakeCalendarResponse makeCalendar(Long fieldID) {
		return null;
	}
}
