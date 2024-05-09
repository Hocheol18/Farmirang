package com.cg.farmirang.agency.feature.user.repository;

import  static  com.cg.farmirang.agency.feature.user.entity.QMember.*;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.agency.feature.user.entity.MemberRole;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom{
	private final JPAQueryFactory queryFactory;

	public MemberRepositoryCustomImpl(@Qualifier("queryFactory") JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

	@Override
	public Integer changeRole(Integer memberId, MemberRole role) {
		log.debug("MemberRepositoryCustomImpl changeRole {} to {}", memberId, role);
		var result = queryFactory.update(member)
			.set(member.role, role)
			.where(member.id.eq(memberId), member.role.ne(MemberRole.ANONYMOUS))
			.execute();
		log.debug("MemberRepositoryCustomImpl changeRole result: {}", result);
		return memberId;
	}
}
