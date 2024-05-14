package com.cg.farmirang.donation.feature.donation.dto.request;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

@Builder
@Schema(name = "ApproveDonorRequestDto", description = "후원글 승인 요청 리스트 DTO")
public record ApproveDonorRequestDto(
	@NotEmpty
	@Schema(description = "후원글 승인 요청 리스트")
	List<ApproveDonorInfoDto> data
) {
}
