package com.cg.farmirang.donation.feature.donation.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "GetDonationListResponseDto", description = "기부 신청글 목록 조회 응답DTO")
public record GetDonationListResponseDto(
	@Schema(description = "기부 신청글 목록")
	List<DonationInfoDto> posts,
	@NotNull
	@Schema(description = "커서 번호")
	Integer cursor
) {
}
