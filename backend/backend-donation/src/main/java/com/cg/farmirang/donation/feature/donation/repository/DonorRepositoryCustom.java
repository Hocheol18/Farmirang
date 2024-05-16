package com.cg.farmirang.donation.feature.donation.repository;


import java.util.Optional;

import com.cg.farmirang.donation.feature.donation.dto.request.GetDonorListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonorListResponseDto;
import com.cg.farmirang.donation.feature.donation.entity.Donor;

public interface DonorRepositoryCustom {
	GetDonorListResponseDto getList(GetDonorListServiceRequestDto data);
	Optional<Donor> getDonorByBoardMemberId(Integer id, Integer memberId);
}
