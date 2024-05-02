package com.cg.farmirang.diary.feature.diary.service;

import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.diary.feature.diary.dto.request.CreateDiaryMRequest;
import com.cg.farmirang.diary.feature.diary.dto.request.ModifyDiaryMRequest;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryAResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryMResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryTotalResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.MakeCalendarResponse;

public interface DiaryService {
	public Boolean insertDiaryManual(Long diaryMId, MultipartFile file, CreateDiaryMRequest request);
	public GetDiaryMResponse selectDiaryManual(Long diaryMId);
	public Boolean deleteDiaryManual(Long diaryMId);
	public Boolean updateDiaryManual(Long diaryMId, MultipartFile file, ModifyDiaryMRequest request);
	public GetDiaryAResponse selectDiaryAuto(Long diaryAId);
	public GetDiaryTotalResponse selectDiaryTotal(Long diaryTId);
	public MakeCalendarResponse makeCalendar(Long fieldID, Integer year, Integer month);
}
