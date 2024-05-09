package com.cg.farmirang.agency.feature.agency.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(name = "AdminAgencyListRequestDto", description = "기관 신청 목록 조회(운영자용)")
public record AdminAgencyListRequestDto(
	@NotBlank
	@Schema(description = "페이징 커서", example = "0")
	Integer cursor,
	@NotBlank
	@Schema(description = "페이지 개수", example = "10")
	Integer size
) {
}
