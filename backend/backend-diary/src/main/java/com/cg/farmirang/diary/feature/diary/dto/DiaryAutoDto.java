package com.cg.farmirang.diary.feature.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryAutoDto {
	private Long diaryAutoId;
	private String cropName;
	private String content;
}
