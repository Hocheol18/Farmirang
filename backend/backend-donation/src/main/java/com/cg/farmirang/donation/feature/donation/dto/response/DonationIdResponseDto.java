package com.cg.farmirang.donation.feature.donation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "DonationIdResponseDto", description = "기부 신청글 등록 응답DTO")
public record DonationIdResponseDto(
	@NotNull
	@Schema(description = "기부 신청글 번호")
	Integer id
) {
}
