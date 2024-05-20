package com.cg.farmirang.agency.feature.agency.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(description = "기관 신청 목록 조회 응답 DTO(운영자용)")
public record AdminAgencyListResponseDto(
	@NotBlank
	@Schema(description = "다음 페이지를 조회하기 위한 cursor 값", example = "1")
	Integer cursor,
	@Schema(description = "기관 목록")
	List<AgencyListInfoDto> agencies
) {
}
