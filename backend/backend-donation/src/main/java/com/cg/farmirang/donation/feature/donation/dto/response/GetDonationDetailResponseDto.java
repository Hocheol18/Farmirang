package com.cg.farmirang.donation.feature.donation.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.cg.farmirang.donation.feature.donation.entity.DonationState;
import com.cg.farmirang.donation.feature.donation.repository.DonationItemInfoDto;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "GetDonationDetailResponseDto", description = "기부 신청글 상세 조회 응답DTO")
public record GetDonationDetailResponseDto(
	@NotNull
	@Schema(description = "기부 신청글 번호")
	Integer id,
	@NotNull
	@JsonProperty("member_id")
	@Schema(description = "회원 번호")
	Integer memberId,
	@NotBlank
	@JsonProperty("header_img")
	@Schema(description = "기부 신청글 헤더 이미지")
	String headerImg,
	@NotBlank
	@Schema(description = "기부 신청글 대표 이미지")
	@JsonProperty("main_img")
	String mainImg,
	@NotBlank
	@Schema(description = "기부 신청글 제목")
	String title,
	@NotNull
	@JsonProperty("start_date")
	@Schema(description = "기부 시작일")
	LocalDateTime startDate,
	@NotNull
	@JsonProperty("end_date")
	@Schema(description = "기부 마감일")
	LocalDateTime endDate,
	@NotBlank
	@JsonProperty("delivery_address")
	@Schema(description = "배송지 주소")
	String deliveryAddress,
	@Schema(description = "기부 신청글 내용")
	String content,
	@NotNull
	@Schema(description = "기부 상태")
	DonationState state,
	@NotNull
	@JsonProperty("register_date")
	@Schema(description = "등록일")
	LocalDateTime registerDate,
	@NotNull
	@Schema(description = "기부 현황")
	Double progress,
	@Schema(description = "기부글 요약")
	String summary,
	@NotEmpty
	@Schema(description = "기부 작물 정보")
	List<DonationItemInfoDto> items
) {
}
