package com.cg.farmirang.agency.feature.agency.service;

import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.agency.feature.agency.dto.request.AdminAgencyListRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.request.AdminApproveRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.request.AgencyRegisterRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AdminAgencyDetailResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AdminAgencyListResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AdminApproveResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AgencyDetailResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AgencyProfileResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AgencyRegisterResponseDto;

public interface AgencyService {
	AgencyRegisterResponseDto registerAgencyService(Integer memberId, AgencyRegisterRequestDto agencyRegisterDto, MultipartFile img);
	AgencyProfileResponseDto agencyProfileService(Integer memberId);
	AgencyDetailResponseDto agencyDetailService(Integer memberId);
	AgencyRegisterResponseDto agencyRegistrationCancelService(Integer memberId, Integer agencyId);
	AdminAgencyListResponseDto adminAgencyListService(AdminAgencyListRequestDto dto);
	AdminAgencyDetailResponseDto adminAgencyDetailService(Integer agencyId);
	AdminApproveResponseDto adminApproveAgencyService(AdminApproveRequestDto dto);
}
