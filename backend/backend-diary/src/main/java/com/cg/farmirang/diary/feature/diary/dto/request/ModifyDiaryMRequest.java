package com.cg.farmirang.diary.feature.diary.dto.request;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "수동 일지 수정을 위한 요청 객체")
public class ModifyDiaryMRequest {
	@Schema(description = "일지를 입력해주세요." , example = "오늘은 빡셌다. 토마토야 좀 자라다오.")
	private String content;
}
