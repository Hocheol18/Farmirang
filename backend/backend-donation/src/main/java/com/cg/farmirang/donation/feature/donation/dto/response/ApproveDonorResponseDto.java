package com.cg.farmirang.donation.feature.donation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "ApproveDonorResponseDto", description = "후원글 승인 응답DTO")
public record ApproveDonorResponseDto(
	@Schema(description = "처리된 후원글 번호")
	Integer id
) {
}
