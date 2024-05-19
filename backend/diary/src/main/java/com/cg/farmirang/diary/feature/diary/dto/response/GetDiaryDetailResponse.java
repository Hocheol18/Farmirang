package com.cg.farmirang.diary.feature.diary.dto.response;

import java.util.List;

import com.cg.farmirang.diary.feature.diary.dto.DiaryAutoDto;
import com.cg.farmirang.diary.feature.diary.dto.DiaryManualDto;
import com.cg.farmirang.diary.feature.diary.dto.DiaryTotalDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetDiaryDetailResponse {
	List<DiaryAutoDto> diaryAutos;
	DiaryManualDto diaryManual;
	DiaryTotalDto diaryTotal;
}
