package com.cg.farmirang.donation.feature.donation.service;

import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.donation.feature.donation.dto.request.ApproveDonorRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.request.GetDonorListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.request.RegisterDonorRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.ApproveDonorResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.DonorIdResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonorListResponseDto;

public interface DonorService {
	DonorIdResponseDto registerDonorService(Integer memberId, RegisterDonorRequestDto data, MultipartFile img);
	DonorIdResponseDto deleteDonorService(Integer memberId, Integer donorId);
	DonorIdResponseDto deleteDonorAdminService(Integer donorId);
	GetDonorListResponseDto getDonorListService(GetDonorListServiceRequestDto data);
	ApproveDonorResponseDto approveDonorService(Integer memberId, ApproveDonorRequestDto data);
}
