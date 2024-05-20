package com.cg.farmirang.donation.feature.donation.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "GetDonorListResponseDto", description = "후원 목록 응답DTO")
public record GetDonorListResponseDto(
	@NotNull
	@Schema(description = "게시글 번호")
	@JsonProperty("board_id")
	Integer boardId,
	@Schema(description = "후원글 목록")
	List<DonorInfoDto> donors,
	@NotNull
	@Schema(description = "커서 번호")
	Integer cursor
) {
}
