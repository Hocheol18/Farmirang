package com.cg.farmirang.backenduser.feature.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "UserBooleanResponseDto", description = "사용자 T/F 응답 DTO")
public record UserBooleanResponseDto(
	@Schema(description = "결과", example = "true")
	Boolean result
) {

}
