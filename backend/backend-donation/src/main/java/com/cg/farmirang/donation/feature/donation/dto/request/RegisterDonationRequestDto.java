package com.cg.farmirang.donation.feature.donation.dto.request;

import java.time.LocalDateTime;
import java.util.List;

import com.cg.farmirang.donation.feature.donation.dto.common.CropCommonDto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "RegisterDonationRequestDto", description = "기부 신청글 등록 요청DTO")
public record RegisterDonationRequestDto(
	String address,
	String title,
	List<CropCommonDto> crops,
	LocalDateTime startDate,
	LocalDateTime endDate,
	String content
) {
}
