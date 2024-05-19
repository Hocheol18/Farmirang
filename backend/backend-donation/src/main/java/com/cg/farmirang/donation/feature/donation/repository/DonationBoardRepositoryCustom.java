package com.cg.farmirang.donation.feature.donation.repository;

import com.cg.farmirang.donation.feature.donation.dto.request.GetDonationListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonationListResponseDto;
import com.cg.farmirang.donation.feature.donation.entity.DonationState;

public interface DonationBoardRepositoryCustom {
	GetDonationListResponseDto getList(GetDonationListServiceRequestDto dto);
	Integer updateProgress(Integer boardId, Double progress);
	Integer updateState(Integer boardId, DonationState state);
}
