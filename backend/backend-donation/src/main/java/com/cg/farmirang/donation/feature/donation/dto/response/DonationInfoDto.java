package com.cg.farmirang.donation.feature.donation.dto.response;

import java.time.LocalDateTime;

import com.cg.farmirang.donation.feature.donation.entity.DonationState;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "DonationInfoDto", description = "기부 신청글 정보DTO")
public record DonationInfoDto(
	@NotNull
	@Schema(description = "기부 신청글 상태")
	DonationState state,
	@NotNull
	@Schema(description = "기부 신청글 번호")
	Integer id,
	@NotBlank
	@Schema(description = "기부 신청글 제목")
	String title,
	@NotBlank
	@Schema(description = "기부 신청글 대표 이미지")
	@JsonProperty("header_img")
	String headerImg,
	@NotBlank
	@Schema(description = "기관 이름")
    String name,
	@NotNull
	@Schema(description = "기부 현황")
	Double progress,
	@NotNull
	@Schema(description = "기부 마감일")
	@JsonProperty("end_date")
	LocalDateTime endDate,
	@Schema(description = "기부글 요약")
	String summary

) {
}
