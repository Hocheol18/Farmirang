package com.cg.farmirang.donation.feature.donation.dto.request;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "ApproveDonorRequestDto", description = "후원글 승인 요청 리스트 DTO")
public record ApproveDonorRequestDto(
	@NotNull
	@Schema(description = "후원글 번호")
	Integer id,
	@NotNull
	@Schema(description = "승인 여부")
	Boolean approval
) {
}
