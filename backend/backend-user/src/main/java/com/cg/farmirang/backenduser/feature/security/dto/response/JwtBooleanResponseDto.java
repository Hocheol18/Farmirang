package com.cg.farmirang.backenduser.feature.security.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "JwtBooleanResponse", description = "JWT T/F 응답 DTO")
public record JwtBooleanResponseDto(
	@NotNull
	@Schema(description = "결과", example = "false")
	Boolean result
) {
}
