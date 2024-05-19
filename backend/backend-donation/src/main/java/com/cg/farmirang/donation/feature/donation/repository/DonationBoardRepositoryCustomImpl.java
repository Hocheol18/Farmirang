package com.cg.farmirang.donation.feature.donation.repository;

import static com.cg.farmirang.donation.feature.donation.entity.QDonationBoard.*;
import static com.cg.farmirang.donation.feature.agency.entity.QWelfareFacility.*;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.donation.feature.donation.dto.request.GetDonationListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.DonationInfoDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonationListResponseDto;
import com.cg.farmirang.donation.feature.donation.entity.DonationState;
import com.cg.farmirang.donation.global.common.code.ErrorCode;
import com.cg.farmirang.donation.global.exception.BusinessExceptionHandler;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class DonationBoardRepositoryCustomImpl implements DonationBoardRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	public DonationBoardRepositoryCustomImpl(@Qualifier("queryFactory") JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

	@Override
	public GetDonationListResponseDto getList(GetDonationListServiceRequestDto dto) {
		log.debug("DonationBoardRepositoryCustomImpl getList cursor: {}", dto.cursor());
		// get list of board using dynamic query
		var now = LocalDateTime.now();
		var query = queryFactory.select(Projections.constructor(DonationInfoDto.class,
				donationBoard.state,
				donationBoard.id,
				donationBoard.title,
				donationBoard.headerImg,
				welfareFacility.name,
				donationBoard.progress,
				donationBoard.endDate,
				donationBoard.summary
			))
			.from(donationBoard)
			.innerJoin(welfareFacility)
			.on(donationBoard.member.id.eq(welfareFacility.memberId));

		// set query for user if user is not null
		if (dto.memberId() != null) {
			query.where(donationBoard.member.id.eq(dto.memberId()));
		}
		else {
			query.where(donationBoard.startDate.before(now), donationBoard.endDate.after(now), donationBoard.state.eq(DonationState.DOING));
		}

		// set query for cusor, size
		var res = query.orderBy(donationBoard.id.asc())
			.offset(dto.cursor())
			.limit(dto.size())
			.fetch();

		var cursor = res.isEmpty() ? dto.cursor() : res.get(res.size() - 1).id();
		log.debug("DonationBoardRepositoryCustomImpl getList cursor: {}", cursor);
		return GetDonationListResponseDto.builder()
			.cursor(cursor)
			.posts(res)
			.build();
	}

	@Override
	public Integer updateProgress(Integer boardId, Double progress) {
		log.debug("DonationBoardRepositoryCustomImpl updateProgress: boardId={}, progress={}", boardId, progress);
		var res = queryFactory.update(donationBoard)
			.set(donationBoard.progress, progress)
			.where(donationBoard.id.eq(boardId))
			.execute();
		if (res == 0)  throw new BusinessExceptionHandler("기부 진행률 갱신 오류", ErrorCode.INTERNAL_SERVER_ERROR);
		return boardId;
	}

	@Override
	public Integer updateState(Integer boardId, DonationState state) {
		log.debug("DonationBoardRepositoryCustomImpl updateState: boardId={}, state={}", boardId, state);
		var res = queryFactory.update(donationBoard)
			.set(donationBoard.state, state)
			.where(donationBoard.id.eq(boardId))
			.execute();
		return boardId;
	}
}
