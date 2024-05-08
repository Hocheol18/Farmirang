package com.cg.farmirang.agency.feature.agency.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "UserIntegerResponseDto", description = "기관 정수 응답 DTO")
public record AgencyIntegerResponseDto(
	@Schema(description = "결과", example = "1")
	Integer result
) {
}
