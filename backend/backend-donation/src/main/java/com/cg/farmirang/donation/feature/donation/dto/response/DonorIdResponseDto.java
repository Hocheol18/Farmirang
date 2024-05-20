package com.cg.farmirang.donation.feature.donation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "RegisterDonorResponse", description = "후원글 등록 응답 DTO")
public record DonorIdResponseDto(
	@NotNull
	@Schema(description = "후원글 번호")
	Integer id
) {
}
