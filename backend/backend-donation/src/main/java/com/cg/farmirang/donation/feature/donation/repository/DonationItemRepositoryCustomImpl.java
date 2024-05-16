package com.cg.farmirang.donation.feature.donation.repository;

import static com.cg.farmirang.donation.feature.donation.entity.QDonationItem.*;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.donation.global.common.code.ErrorCode;
import com.cg.farmirang.donation.global.exception.BusinessExceptionHandler;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class DonationItemRepositoryCustomImpl implements DonationItemRepositoryCustom{
	private final JPAQueryFactory queryFactory;

	public DonationItemRepositoryCustomImpl(@Qualifier("queryFactory") JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

	@Override
	public Double approveCurrentAndGetAverage(Integer boardId, Integer cropId, Integer amount) {
		log.debug("DonationItemRepositoryCustomImpl updateCurrentAndGetAverage");
		var res = queryFactory.update(donationItem)
			.set(donationItem.current, donationItem.current.add(amount))
			.where(donationItem.board.id.eq(boardId)
				.and(donationItem.crop.id.eq(cropId)))
			.execute();
		if(res == 0) {
			log.warn("DonationItemRepositoryCustomImpl updateCurrentAndGetAverage: no row updated, boardId={}, cropId={}", boardId, cropId);
			throw new BusinessExceptionHandler("후원 반영 오류", ErrorCode.INVALID_POST_ITEM_ADD_ERROR);
		}
		// find by board id and get average
		return getAverage(boardId);
	}

	@Override
	public Double rejectCurrentAndGetAverage(Integer boardId, Integer cropId, Integer amount) {
		log.debug("DonationItemRepositoryCustomImpl rejectCurrentAndGetAverage");
		var res = queryFactory.update(donationItem)
			.set(donationItem.current, donationItem.current.subtract(amount))
			.where(donationItem.board.id.eq(boardId)
				.and(donationItem.crop.id.eq(cropId)).and(donationItem.current.goe(amount)))
			.execute();
		if(res == 0) {
			log.warn("DonationItemRepositoryCustomImpl rejectCurrentAndGetAverage: no row updated, boardId={}, cropId={}", boardId, cropId);
			throw new BusinessExceptionHandler("후원 반영 오류", ErrorCode.INVALID_POST_ITEM_SUBTRACT_ERROR);
		}
		return getAverage(boardId);
	}

	@Override
	public Double getAverage(Integer boardId) {
		return queryFactory.select(donationItem.current.divide(donationItem.amount.floatValue()).avg())
			.from(donationItem)
			.where(donationItem.board.id.eq(boardId))
			.fetchOne();
	}

	@Override
	public Boolean checkDonationComplete(Integer boardId) {
		log.debug("DonationItemRepositoryCustomImpl checkDonationComplete, boardId: {}", boardId);
		var res = queryFactory.select(donationItem.id.count())
			.from(donationItem)
			.where(donationItem.board.id.eq(boardId), donationItem.current.lt(donationItem.amount))
			.fetchOne();
		return res == null || res <= 0;
	}
}
