package com.cg.farmirang.donation.feature.donation.service;

import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.donation.feature.donation.dto.request.GetDonationListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.request.RegisterDonationRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.DonationIdResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonationDetailResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonationListResponseDto;

public interface DonationService {
	DonationIdResponseDto registerDonationService(Integer memberId, RegisterDonationRequestDto data, MultipartFile headerImg, MultipartFile mainImg);
	DonationIdResponseDto deleteDonationService(Integer memberId, Integer boardId);
	DonationIdResponseDto deleteDonationAdminService(Integer boardId);
	GetDonationListResponseDto getDonationListService(GetDonationListServiceRequestDto dto);
	GetDonationDetailResponseDto getDonationDetailService(Integer boardId);

}
