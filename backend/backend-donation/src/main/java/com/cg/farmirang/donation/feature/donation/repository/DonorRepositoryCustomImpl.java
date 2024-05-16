package com.cg.farmirang.donation.feature.donation.repository;

import static com.cg.farmirang.donation.feature.donation.entity.QDonor.*;
import static com.cg.farmirang.donation.feature.donation.entity.QDonationBoard.*;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.donation.feature.donation.dto.request.GetDonorListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.DonorInfoDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonorListResponseDto;
import com.cg.farmirang.donation.feature.donation.entity.Donor;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class DonorRepositoryCustomImpl implements DonorRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	public DonorRepositoryCustomImpl(@Qualifier("queryFactory") JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

	@Override
	public GetDonorListResponseDto getList(GetDonorListServiceRequestDto data) {
		log.debug("DonorRepositoryCustomImpl getList");
		var query = queryFactory.select(Projections.constructor(DonorInfoDto.class,
			donor.id,
			donor.board.id,
			donor.member.id,
			donor.crop.id,
			donor.amount,
			donor.approval,
			donor.registerDate,
			donor.confirmImg))
			.from(donor)
			.where(donor.board.id.eq(data.donationId()))
			.orderBy(donor.id.asc())
			.offset(data.cursor())
			.limit(data.size())
			.fetch();

		var cursor = query.isEmpty() ? data.cursor() : query.get(query.size() - 1).id();
		var boardId = data.donationId();
		return GetDonorListResponseDto.builder()
			.cursor(cursor)
			.boardId(boardId)
			.donors(query)
			.build();
	}
	@Override
	public Optional<Donor> getDonorByBoardMemberId(Integer id, Integer memberId) {
		log.debug("DonorRepositoryCustomImpl getDonorListByBoardMemberId: memberId: {}", memberId);
		var res = queryFactory.select(donor)
			.from(donor)
			.innerJoin(donationBoard)
			.on(donor.board.id.eq(donationBoard.id))
			.where(donationBoard.member.id.eq(memberId).and(donor.id.eq(id)))
			.fetchOne();

		return Optional.ofNullable(res);
	}
}
