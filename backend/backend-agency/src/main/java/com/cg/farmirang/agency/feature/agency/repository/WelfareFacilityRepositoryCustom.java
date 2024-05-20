package com.cg.farmirang.agency.feature.agency.repository;

import com.cg.farmirang.agency.feature.agency.dto.request.AdminAgencyListRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.request.AdminApproveRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AdminAgencyListResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AgencyDetailResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AgencyProfileResponseDto;

public interface WelfareFacilityRepositoryCustom {
	AgencyProfileResponseDto getAgencyProfile(Integer memberId);
	AgencyDetailResponseDto getAgencyDetail(Integer memberId);
	AdminAgencyListResponseDto getAdminAgencyList(AdminAgencyListRequestDto dto);
	Integer approveAgency(AdminApproveRequestDto dto);
	Integer getMemberId(Integer agencyId);
}
