package com.cg.farmirang.backenduser.feature.user.repository;

import static com.cg.farmirang.backenduser.feature.user.entity.QMember.*;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.backenduser.feature.user.dto.response.UserStringResponseDto;
import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom {
	@Value("${com.farmirang.user.default_profile}")
	private String defaulProfile;

	private final JPAQueryFactory queryFactory;

	public MemberRepositoryCustomImpl(@Qualifier("queryFactory") JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

	@Override
	public void changeAnonymous(Integer memberId) {
		queryFactory.update(member)
			.set(member.nickname, "anonymous")
			.set(member.profileImg, defaulProfile)
			.set(member.role, MemberRole.MEMBER)
			.set(member.badge, 0)
			.where(member.id.eq(memberId))
			.execute();
	}

	@Override
	public UserStringResponseDto updateNickname(Integer memberId, String nickname) {
		queryFactory.update(member)
			.set(member.nickname, nickname)
			.where(member.id.eq(memberId))
			.execute();
		return queryFactory
			.select(Projections.constructor(
				UserStringResponseDto.class,
				member.nickname
			)).from(member)
			.where(member.id.eq(memberId))
			.fetchOne();
	}

	@Override
	public UserStringResponseDto updateProfileImg(Integer memberId, String profileImg) {
		queryFactory.update(member)
			.set(member.profileImg, profileImg)
			.where(member.id.eq(memberId))
			.execute();
		return queryFactory
			.select(Projections.constructor(
				UserStringResponseDto.class,
				member.profileImg
			)).from(member)
			.where(member.id.eq(memberId))
			.fetchOne();
	}
}
