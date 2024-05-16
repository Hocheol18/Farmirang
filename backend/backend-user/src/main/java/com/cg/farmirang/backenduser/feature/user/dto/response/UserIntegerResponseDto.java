package com.cg.farmirang.backenduser.feature.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "UserIntegerResponseDto", description = "사용자 정수 응답 DTO")
public record UserIntegerResponseDto(
	@NotNull
	@Schema(description = "결과", example = "1")
	Long result
) {
}
