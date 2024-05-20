package com.cg.farmirang.agency.feature.agency.repository;

import static com.cg.farmirang.agency.feature.agency.entity.QWelfareFacility.*;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.agency.feature.agency.dto.request.AdminAgencyListRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.request.AdminApproveRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AdminAgencyListResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AgencyDetailResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AgencyListInfoDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AgencyProfileResponseDto;
import com.cg.farmirang.agency.feature.user.entity.MemberRole;

import com.cg.farmirang.agency.global.common.code.ErrorCode;
import com.cg.farmirang.agency.global.exception.BusinessExceptionHandler;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class WelfareFacilityRepositoryCustomImpl implements WelfareFacilityRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	public WelfareFacilityRepositoryCustomImpl(@Qualifier("queryFactory") JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

	@Override
	public AgencyProfileResponseDto getAgencyProfile(Integer memberId) {
		log.debug("WelfareFacilityRepositoryCustomImpl getAgencyProfile memberId: {}", memberId);
		var result =  queryFactory.select(Projections.constructor(AgencyProfileResponseDto.class,
				welfareFacility.name,
				welfareFacility.address,
				welfareFacility.reportNumber,
				welfareFacility.contact
			)).from(welfareFacility)
			.where(welfareFacility.member.id.eq(memberId), welfareFacility.member.role.ne(MemberRole.ANONYMOUS), welfareFacility.approval.eq(true))
			.fetchOne();
		if(result == null) throw new BusinessExceptionHandler("해당 기관이 존재하지 않습니다", ErrorCode.NOT_FOUND_AGENCY_ERROR );
		else return result;
	}

	@Override
	public AgencyDetailResponseDto getAgencyDetail(Integer memberId) {
		log.debug("WelfareFacilityRepositoryCustomImpl getAgencyDetail memberId: {}", memberId);
		var result =  queryFactory.select(Projections.constructor(AgencyDetailResponseDto.class,
				welfareFacility.id,
				welfareFacility.name,
				welfareFacility.address,
				welfareFacility.reportNumber,
				welfareFacility.approval,
				welfareFacility.contact,
				welfareFacility.reason
			)).from(welfareFacility)
			.where(welfareFacility.member.id.eq(memberId), welfareFacility.member.role.ne(MemberRole.ANONYMOUS))
			.fetchOne();
		if(result == null) throw new BusinessExceptionHandler("해당 기관이 존재하지 않습니다", ErrorCode.NOT_FOUND_AGENCY_ERROR);
		else return result;
	}

	@Override
	public AdminAgencyListResponseDto getAdminAgencyList(AdminAgencyListRequestDto dto) {
		log.debug("WelfareFacilityRepositoryCustomImpl getAdminAgencyList dto: {}", dto);
		var list = queryFactory.select(Projections.constructor(AgencyListInfoDto.class,
			welfareFacility.id,
			welfareFacility.name,
			welfareFacility.approval))
			.from(welfareFacility)
			.where(welfareFacility.member.role.ne(MemberRole.ANONYMOUS), welfareFacility.id.gt(dto.cursor()))
			.limit(dto.size())
			.orderBy(welfareFacility.id.asc())
			.fetch();
		var cursor = list.isEmpty() ? dto.cursor() : list.get(list.size() - 1).id();
		log.debug("WelfareFacilityRepositoryCustomImpl getAdminAgencyList cursor: {}", cursor);
		return AdminAgencyListResponseDto.builder()
			.cursor(cursor)
			.agencies(list)
			.build();
	}

	@Override
	public Integer approveAgency(AdminApproveRequestDto dto) {
		log.debug("WelfareFacilityRepositoryCustomImpl approveAgency dto: {}", dto);
		queryFactory.update(welfareFacility)
			.set(welfareFacility.approval, dto.approval())
			.set(welfareFacility.reason, dto.reason())
			.where(welfareFacility.id.eq(dto.agencyId()))
			.execute();
		return dto.agencyId();
	}

	@Override
	public Integer getMemberId(Integer agencyId) {
		log.debug("WelfareFacilityRepositoryCustomImpl getMemberId agencyId: {}", agencyId);
		return queryFactory.select(welfareFacility.member.id)
			.from(welfareFacility)
			.where(welfareFacility.id.eq(agencyId))
			.fetchOne();
	}
}
