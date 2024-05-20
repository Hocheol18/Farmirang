package com.cg.farmirang.diary.feature.diary.dto.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetDiaryTotalResponse {
	private String weather;
	private String weatherIcon;
	private String temperature;
	private String humidity;
	private String fieldHumidity;
	private LocalDate diaryAt;
}
