package com.cg.farmirang.backenduser.feature.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "UserIntegerResponseDto", description = "사용자 정수 응답 DTO")
public record UserIntegerResponseDto(
	@Schema(description = "결과", example = "1")
	Integer result
) {
}
