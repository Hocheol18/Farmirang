package com.cg.farmirang.donation.feature.donation.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "GetDonorListServiceRequestDto", description = "후원자 목록 조회 요청 DTO")
public record GetDonorListServiceRequestDto(
	@NotNull
	@Schema( description = "후원 ID", example = "1")
	@JsonProperty("donation_id")
	Integer donationId,
	@NotNull
	@Schema( description = "시작글 번호", example = "0")
	Integer cursor,
	@NotNull
	@Schema( description = "게시글 개수", example = "10")
	Integer size
) {
}
