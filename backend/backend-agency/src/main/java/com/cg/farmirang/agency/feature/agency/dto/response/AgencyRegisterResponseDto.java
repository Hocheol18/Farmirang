package com.cg.farmirang.agency.feature.agency.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "UserIntegerResponseDto", description = "기관 정수 응답 DTO")
public record AgencyRegisterResponseDto(
	@Schema(description = "구분 번호", example = "1")
	Integer id
) {
}
