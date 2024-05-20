package com.cg.farmirang.donation.feature.donation.dto.common;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "CropCommonDto", description = "작물 공통DTO")
public record CropCommonDto(
	@NotNull
	@Schema(description = "작물 번호")
	Integer id,
	@NotNull
	@Schema(description = "기부 목표량")
	Integer amount,
	@NotBlank
	@Schema(description = "단위")
	String unit
) {
}
