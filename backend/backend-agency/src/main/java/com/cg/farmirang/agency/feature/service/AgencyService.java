package com.cg.farmirang.agency.feature.service;

import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.agency.feature.dto.request.AgencyRegisterRequestDto;
import com.cg.farmirang.agency.feature.dto.response.AgencyIntegerResponseDto;

public interface AgencyService {
	AgencyIntegerResponseDto registerAgencyService(AgencyRegisterRequestDto agencyRegisterDto, MultipartFile file);
	Object agencyInfoService();
	Object approveAgencyService();
}
