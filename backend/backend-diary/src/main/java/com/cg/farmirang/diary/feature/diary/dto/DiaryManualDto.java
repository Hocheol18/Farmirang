package com.cg.farmirang.diary.feature.diary.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryManualDto {
	private Long diaryManualId;
	private String content;
	private String photo;
}
