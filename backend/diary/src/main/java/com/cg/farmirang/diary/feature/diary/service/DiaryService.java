package com.cg.farmirang.diary.feature.diary.service;

import com.cg.farmirang.diary.feature.diary.dto.request.CreateDiaryMRequest;
import com.cg.farmirang.diary.feature.diary.dto.request.ModifyDiaryMRequest;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryAResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryMResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryTotal;
import com.cg.farmirang.diary.feature.diary.dto.response.MakeCalendarResponse;

public interface DiaryService {
	public Boolean insertDiaryManual(CreateDiaryMRequest request);
	public GetDiaryMResponse selectDiaryManual(Long fieldID, Integer month, Integer day);
	public Boolean deleteDiaryManual(Long fieldID, Integer month, Integer day);
	public Boolean updateDiaryManual(Long fieldID, Integer month, Integer day, ModifyDiaryMRequest request);

	public GetDiaryAResponse selectDiaryAuto(Long fieldID, Integer month, Integer day);

	public GetDiaryTotal selectDiaryTotal(Long fieldID, Integer month, Integer day);

	public MakeCalendarResponse makeCalendar(Long fieldID);
}
