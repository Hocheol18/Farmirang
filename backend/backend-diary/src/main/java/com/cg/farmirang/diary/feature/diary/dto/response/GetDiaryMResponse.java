package com.cg.farmirang.diary.feature.diary.dto.response;

import java.time.LocalDate;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetDiaryMResponse {
	private String content;
	private String photo;
	private LocalDate diaryAt;
}
