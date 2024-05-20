package com.cg.farmirang.donation.feature.donation.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(description = "기부자 목록 조회 요청")
public record GetDonationListServiceRequestDto(
	@NotNull
	@Schema(description = "회원 아이디")
	Integer memberId,
	@NotNull
	@Schema(description = "커서 번호")
	Integer cursor,
	@NotNull
	@Schema(description = "게시글 개수")
	Integer size
) {
}
