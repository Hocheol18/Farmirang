package com.cg.farmirang.donation.feature.donation.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "RegisterDonorRequest", description = "후원글 등록 DTO")
public record RegisterDonorRequestDto(
	@NotNull
	@Schema(description = "게시글 번호")
	@JsonProperty("board_id")
	Integer boardId,
	@NotNull
	@Schema(description = "농작물 번호")
	@JsonProperty("crop_id")
	Integer cropId,
	@NotNull
	@Schema(description = "후원 양")
	Integer amount

) {
}
