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
		return queryFactory.select(Projections.bean(AgencyProfileResponseDto.class,
				welfareFacility.name,
				welfareFacility.address,
				welfareFacility.reportNumber,
				welfareFacility.contact
			)).from(welfareFacility)
			.where(welfareFacility.member.id.eq(memberId), welfareFacility.member.role.ne(MemberRole.ANONYMOUS))
			.fetchOne();
	}

	@Override
	public AgencyDetailResponseDto getAgencyDetail(Integer memberId) {

		return queryFactory.select(Projections.bean(AgencyDetailResponseDto.class,
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
	}

	@Override
	public AdminAgencyListResponseDto getAdminAgencyList(AdminAgencyListRequestDto dto) {
		var list = queryFactory.select(Projections.bean(AgencyListInfoDto.class,
			welfareFacility.id,
			welfareFacility.name,
			welfareFacility.approval))
			.from(welfareFacility)
			.where(welfareFacility.member.role.ne(MemberRole.ANONYMOUS), welfareFacility.id.gt(dto.cursor()))
			.limit(dto.size())
			.orderBy(welfareFacility.id.asc())
			.fetch();
		var cursor = list.isEmpty() ? dto.cursor() : list.get(list.size() - 1).id();
		return AdminAgencyListResponseDto.builder()
			.cursor(cursor)
			.agencies(list)
			.build();
	}

	@Override
	public Integer approveAgency(AdminApproveRequestDto dto) {
		queryFactory.update(welfareFacility)
			.set(welfareFacility.approval, dto.approval())
			.set(welfareFacility.reason, dto.reason())
			.where(welfareFacility.id.eq(dto.agencyId()))
			.execute();
		return dto.agencyId();
	}
}
