package com.cg.farmirang.backenduser.feature.user.repository;

import static com.cg.farmirang.backenduser.feature.user.entity.QSocialLogin.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.backenduser.feature.user.dto.response.AdminUserSocialLoginInfoDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class SocialLoginRepositoryCustomImpl implements SocialLoginRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	public SocialLoginRepositoryCustomImpl(@Qualifier("queryFactory") JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

	@Override
	public Integer deleteByMemberId(Integer memberId) {
		log.debug("SocialLoginRepositoryCustomImpl deleteByMemberId: memberId={}", memberId);
		var res = queryFactory.delete(socialLogin)
			.where(socialLogin.member.id.eq(memberId))
			.execute();
		if (res > 0)
			return memberId;
		else
			return -1;
	}

	@Override
	public List<AdminUserSocialLoginInfoDto> getSocialLoginInfoList(Integer memberId) {
		log.debug("SocialLoginRepositoryCustomImpl getSocialLoginInfoList: memberId={}", memberId);
		return queryFactory.select(Projections.constructor(AdminUserSocialLoginInfoDto.class,
				socialLogin.id,
				socialLogin.provider,
				socialLogin.sub))
			.from(socialLogin)
			.where(socialLogin.member.id.eq(memberId))
			.fetch();
	}
}
