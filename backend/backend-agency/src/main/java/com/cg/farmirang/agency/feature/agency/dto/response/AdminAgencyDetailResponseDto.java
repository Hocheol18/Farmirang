package com.cg.farmirang.agency.feature.agency.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(name = "AdminAgencyDetailResponse", description = "기관 신청 상세 조회 DTO")
public record AdminAgencyDetailResponseDto(
	@NotBlank
	@Schema(description = "기관 구분 번호", example = "1")
	Integer id,
	@NotBlank
	@Schema(description = "기관명", example = "파미랑복지센터")
	String name,
	@NotBlank
	@Schema(description = "기관 주소", example = "서울시 강남구")
	String address,
	@NotBlank
	@Schema(description = "기관 신고 번호", example = "지자체명-종류-00001호")
	@JsonProperty("report_number")
	String reportNumber,
	@Schema(description = "기관 승인 여부, 미확인은 null", example = "true")
	Boolean approval,
	@NotBlank
	@Schema(description = "기관 연락처", example = "02-1234-5678")
	String contact,
	@Schema(description = "승인 처리 사유", example = "정보 불일치로 거절")
	String reason,
	@Schema(description = "기관 이미지 URL", example = "http://localhost/1.jpg")
	String img

) {
}
