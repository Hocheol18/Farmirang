package com.cg.farmirang.donation.feature.donation.repository;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "DonationItemInfoDto", description = "기부 신청글 상세 조회 응답DTO")
public record DonationItemInfoDto(
	@NotNull
	@Schema(description = "기부 작물 구분 번호")
	Integer id,
	@NotNull
	@Schema(description = "기부 작물 번호")
	@JsonProperty("crop_id")
	Integer cropId,
	@NotNull
	@Schema(description = "기부 작물 총 수량")
	Integer amount,
	@NotBlank
	@Schema(description = "기부 단위")
	String unit,
	@NotNull
	@Schema(description = "기부 작물 현재 수량")
	Integer current
) {
}
