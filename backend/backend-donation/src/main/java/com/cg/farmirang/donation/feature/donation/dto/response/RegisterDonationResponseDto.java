package com.cg.farmirang.donation.feature.donation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(name = "RegisterDonationResponseDto", description = "기부 신청글 등록 응답DTO")
public record RegisterDonationResponseDto(
	@NotBlank
	@Schema(description = "기부 신청글 번호")
	Integer id
) {
}
