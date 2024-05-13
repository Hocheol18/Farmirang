package com.cg.farmirang.donation.feature.donation.dto.response;

import com.cg.farmirang.donation.feature.donation.entity.DonationState;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "GetDonationDetailResponseDto", description = "기부 신청글 상세 조회 응답DTO")
public record GetDonationDetailResponseDto(



) {
}
