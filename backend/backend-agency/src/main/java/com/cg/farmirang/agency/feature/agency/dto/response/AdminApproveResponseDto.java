package com.cg.farmirang.agency.feature.agency.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "운영자 승인/거절 응답")
public record AdminApproveResponseDto(
	@Schema(description = "기관 구분 번호", example = "1")
	Integer id
) {
}
