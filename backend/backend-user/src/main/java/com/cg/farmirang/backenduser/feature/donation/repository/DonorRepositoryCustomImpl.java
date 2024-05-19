package com.cg.farmirang.backenduser.feature.donation.repository;

import static com.cg.farmirang.backenduser.feature.donation.entity.QDonor.*;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
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
	public Long countDonorByMemberIdAndApproval(Integer memberId, Boolean approval) {
		log.debug("DonorRepositoryCustomImpl countDonorByMemberIdAndApproval: memberId : {}, approval : {}", memberId,
			approval);
		return queryFactory.select(donor.id.count())
			.from(donor)
			.where(donor.member.id.eq(memberId)
				.and(donor.approval.eq(approval))
				.and(donor.member.role.ne(MemberRole.ANONYMOUS)))
			.fetchOne();
	}
}
