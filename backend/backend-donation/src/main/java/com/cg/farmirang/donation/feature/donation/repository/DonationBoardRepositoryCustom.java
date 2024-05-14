package com.cg.farmirang.donation.feature.donation.repository;

import com.cg.farmirang.donation.feature.donation.dto.request.GetDonationListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonationListResponseDto;

public interface DonationBoardRepositoryCustom {
	GetDonationListResponseDto getList(GetDonationListServiceRequestDto dto);
}
