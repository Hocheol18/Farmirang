package com.cg.farmirang.donation.feature.donation.repository;

import com.cg.farmirang.donation.feature.donation.dto.request.ApproveDonorRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.request.GetDonorListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.ApproveDonorResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonorListResponseDto;

public interface DonorRepositoryCustom {
	GetDonorListResponseDto getList(GetDonorListServiceRequestDto data);
	ApproveDonorResponseDto approveAll(Integer memberId, ApproveDonorRequestDto data);
}
