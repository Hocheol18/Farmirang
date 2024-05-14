package com.cg.farmirang.donation.feature.donation.dto.request;

import java.time.LocalDateTime;
import java.util.List;

import com.cg.farmirang.donation.feature.donation.dto.common.CropCommonDto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "RegisterDonationRequestDto", description = "기부 신청글 등록 요청DTO")
public record RegisterDonationRequestDto(
	@NotBlank
	@Schema(description = "기부 배송 주소")
	String address,
	@NotBlank
	@Schema(description = "기부글 제목")
	String title,
	@NotEmpty
	@Schema(description = "기부 농작물 리스트")
	List<CropCommonDto> crops,
	@NotNull
	@Schema(description = "기부 시작일")
	LocalDateTime startDate,
	@NotNull
	@Schema(description = "기부 종료일")
	LocalDateTime endDate,
	@Schema(description = "기부글 내용")
	String content,
	@Schema(description = "기부글 요약")
	String summary
) {
}
