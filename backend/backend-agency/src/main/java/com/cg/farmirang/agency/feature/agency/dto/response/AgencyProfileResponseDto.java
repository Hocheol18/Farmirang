package com.cg.farmirang.agency.feature.agency.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(name = "AgencyProfileResponseDto", description = "기관 프로필 조회 DTO")
public record AgencyProfileResponseDto(
	@NotBlank
	@Schema(description = "기관명", example = "파미랑복지센터")
	String name,
	@NotBlank
	@Schema(description = "기관 주소", example = "서울시 강남구")
    String address,
	@NotBlank
	@Schema(description = "신고번호", example = "지자체명-종류-00001호")
	@JsonProperty("report_number")
    String reportNumber,
	@NotBlank
	@Schema(description = "기관 연락처(전화 또는 이메일)", example = "02-1234-5678")
	String contact
) {
}
