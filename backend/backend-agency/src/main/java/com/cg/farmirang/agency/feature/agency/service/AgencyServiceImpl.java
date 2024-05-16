package com.cg.farmirang.agency.feature.agency.service;

import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
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
import com.cg.farmirang.agency.feature.agency.entity.RedisRoleEntity;
import com.cg.farmirang.agency.feature.agency.entity.WelfareFacility;
import com.cg.farmirang.agency.feature.agency.repository.RedisRoleRepository;
import com.cg.farmirang.agency.feature.agency.repository.WelfareFacilityRepository;
import com.cg.farmirang.agency.feature.user.entity.MemberRole;
import com.cg.farmirang.agency.feature.user.repository.MemberRepository;
import com.cg.farmirang.agency.global.common.code.ErrorCode;
import com.cg.farmirang.agency.global.common.service.S3Service;
import com.cg.farmirang.agency.global.exception.BusinessExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AgencyServiceImpl implements AgencyService {
	private final S3Service s3;
	private final WelfareFacilityRepository repo;
	private final MemberRepository memberRepo;
	private final RedisRoleRepository redis;

	@Value("${cloud.aws.s3.dir}")
	private String s3Dir;

	@Override
	@Transactional
	public AgencyRegisterResponseDto registerAgencyService(Integer memberId, AgencyRegisterRequestDto agencyRegisterDto,
		MultipartFile img) {
		// find member
		log.debug("AgencyServiceImpl registerAgencyService memberId: {}, dto: {}", memberId, agencyRegisterDto);
		var member = memberRepo.findByIdAndRoleNot(memberId, MemberRole.ANONYMOUS)
			.orElseThrow(() -> new BusinessExceptionHandler("해당 회원이 존재하지 않습니다.", ErrorCode.NOT_FOUND_MEMBER_ERROR));
		// upload image
		log.debug("AgencyServiceImpl registerAgencyService img: {}", img.getOriginalFilename());
		var uuid = UUID.randomUUID().toString();
		var s3Url = s3.upload(img, s3Dir, uuid);
		// create entity
		var entity = WelfareFacility.builder()
			.member(member)
			.name(agencyRegisterDto.name())
			.address(agencyRegisterDto.address())
			.reportNumber(agencyRegisterDto.report())
			.contact(agencyRegisterDto.contact())
			.img(s3Url)
			.build();
		// save entity
		var result = repo.save(entity);
		log.debug("AgencyServiceImpl registerAgencyService result: {}", result.getId());
		// return
		return AgencyRegisterResponseDto.builder()
			.id(result.getId())
			.build();
	}

	@Override
	public AgencyProfileResponseDto agencyProfileService(Integer memberId) {
		log.debug("AgencyServiceImpl agencyProfileService memberId: {}", memberId);
		return repo.getAgencyProfile(memberId);
	}

	@Override
	public AgencyDetailResponseDto agencyDetailService(Integer memberId) {
		log.debug("AgencyServiceImpl agencyDetailService memberId: {}", memberId);
		return repo.getAgencyDetail(memberId);
	}

	@Override
	@Transactional
	public AgencyRegisterResponseDto agencyRegistrationCancelService(Integer memberId, Integer agencyId) {
		log.debug("AgencyServiceImpl agencyRegistrationCancelService agencyId: {}", agencyId);
		// find agency
		var entity = repo.findById(agencyId)
			.orElseThrow(() -> new BusinessExceptionHandler("해당 기관이 존재하지 않습니다.", ErrorCode.NOT_FOUND_AGENCY_ERROR));
		if(!Objects.equals(memberId, entity.getMember().getId())) throw new BusinessExceptionHandler("해당 기관에 대한 권한이 없습니다.", ErrorCode.FORBIDDEN_AGENCY_ERROR);
		// delete s3 image
		String filename = entity.getImg();
		String key = filename.substring(filename.indexOf(s3Dir) + s3Dir.length() + 1);
		s3.delete(key, s3Dir);
		// change member's role to memeber
		memberRepo.changeRole(memberId, MemberRole.MEMBER);
		// delete entity
		repo.delete(entity);
		log.debug("AgencyServiceImpl agencyRegistrationCancelService result agency id: {}", entity.getId());
		// return
		return AgencyRegisterResponseDto.builder()
			.id(entity.getId())
			.build();
	}

	@Override
	public AdminAgencyListResponseDto adminAgencyListService(AdminAgencyListRequestDto dto) {
		log.debug("AgencyServiceImpl adminAgencyListService dto: {}", dto);
		return repo.getAdminAgencyList(dto);
	}

	@Override
	public AdminAgencyDetailResponseDto adminAgencyDetailService(Integer agencyId) {
		log.debug("AgencyServiceImpl adminAgencyDetailService agencyId: {}", agencyId);
		var entity = repo.findById(agencyId)
			.orElseThrow(() -> new BusinessExceptionHandler("해당 기관이 존재하지 않습니다.", ErrorCode.NOT_FOUND_AGENCY_ERROR));

		return AdminAgencyDetailResponseDto.builder()
			.id(entity.getId())
			.name(entity.getName())
			.address(entity.getAddress())
			.reportNumber(entity.getReportNumber())
			.approval(entity.getApproval())
			.contact(entity.getContact())
			.reason(entity.getReason())
			.img(entity.getImg())
			.build();
	}

	@Override
	@Transactional
	public AdminApproveResponseDto adminApproveAgencyService(AdminApproveRequestDto dto) {
		// approve/reject agency
		log.debug("AgencyServiceImpl adminApproveAgencyService dto: {}", dto);
		if(dto.approval() == null) throw new BusinessExceptionHandler("승인 여부를 선택해주세요.", ErrorCode.INVALID_APPROVAL_VALUE_ERROR);
		var result = repo.approveAgency(dto);
		log.debug("AgencyServiceImpl adminApproveAgencyService result: {}", result);
		// if approve, change member's role to agency
		var memberId = repo.getMemberId(dto.agencyId());
		log.debug("AgencyServiceImpl adminApproveAgencyService memberId: {}", memberId);
		if (dto.approval()) {
			memberRepo.changeRole(memberId, MemberRole.AGENCY);
			cacheRole(memberId, MemberRole.AGENCY);
		}
		else {
			memberRepo.changeRole(memberId, MemberRole.MEMBER);
			cacheRole(memberId, MemberRole.MEMBER);
		}

		return AdminApproveResponseDto.builder()
			.id(result)
			.build();
	}
	@Transactional
	protected void cacheRole(Integer memberId, MemberRole role) {
		var entity = redis.findById(memberId).orElse(RedisRoleEntity.builder().id(memberId).build());
		entity.setRole(role);
		redis.save(entity);
	}
}
