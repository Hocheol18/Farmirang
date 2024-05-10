package com.cg.farmirang.agency.feature.agency.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(name = "AdminApproveRequest", description = "기관 승인 요청 DTO")
public record AdminApproveRequestDto(
	@Schema(description = "기관 ID", example = "1")
	@NotBlank
	@JsonProperty("agency_id")
	Integer agencyId,
	@NotBlank
	@Schema(description = "승인 여부", example = "true")
	Boolean approval,
	@Schema(description = "처리 사유", example = "기관 정보가 부족합니다")
	String reason
) {
}
