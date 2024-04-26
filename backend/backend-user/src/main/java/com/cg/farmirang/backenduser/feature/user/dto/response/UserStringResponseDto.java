package com.cg.farmirang.backenduser.feature.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "UserStringResponseDto", description = "사용자 문자열 응답 DTO")
public record UserStringResponseDto(
	@Schema(description = "결과", example = "...")
	String result
) {
}
