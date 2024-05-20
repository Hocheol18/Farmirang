package com.cg.farmirang.donation.feature.donation.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "DonorInfoDto", description = "후원글 응답DTO")
public record DonorInfoDto(
	@NotNull
	@Schema(description = "후원글 번호")
	Integer id,
	@NotNull
	@Schema(description = "게시글 번호")
	@JsonProperty("board_id")
	Integer boardId,
	@NotNull
	@Schema(description = "회원 구분 번호")
	@JsonProperty("member_id")
	Integer memberId,
	@NotNull
	@Schema(description = "농작물 구분 번호")
	@JsonProperty("crop_id")
	Integer cropId,
	@NotNull
	@Schema(description = "수량")
	Integer amount,
	@Schema(description = "승인 여부")
	Boolean approval,
	@NotNull
	@Schema(description = "등록일")
	@JsonProperty("register_date")
	LocalDateTime registerDate,
	@NotBlank
	@Schema(description = "확인 이미지")
	@JsonProperty("confirm_img")
	String confirmImg
) {
}
