package com.cg.farmirang.agency.feature.agency.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
import com.cg.farmirang.agency.feature.agency.repository.WelfareFacilityRepository;
import com.cg.farmirang.agency.global.common.service.S3Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AgencyServiceImpl implements AgencyService{
	private final S3Service s3;
	private final WelfareFacilityRepository repo;

	@Override
	@Transactional
	public AgencyRegisterResponseDto registerAgencyService(Integer memberId, AgencyRegisterRequestDto agencyRegisterDto,
		MultipartFile img) {

		return null;
	}

	@Override
	public AgencyProfileResponseDto agencyProfileService(Integer memberId) {
		return null;
	}

	@Override
	public AgencyDetailResponseDto agencyDetailService(Integer memberId) {
		return null;
	}

	@Override
	@Transactional
	public AgencyRegisterResponseDto agencyRegistrationCancelService(Integer agencyId) {
		return null;
	}

	@Override
	public AdminAgencyListResponseDto adminAgencyListService(AdminAgencyListRequestDto dto) {
		return null;
	}

	@Override
	public AdminAgencyDetailResponseDto adminAgencyDetailService(Integer agencyId) {
		return null;
	}

	@Override
	@Transactional
	public AdminApproveResponseDto adminApproveAgencyService(AdminApproveRequestDto dto) {
		return null;
	}
}
