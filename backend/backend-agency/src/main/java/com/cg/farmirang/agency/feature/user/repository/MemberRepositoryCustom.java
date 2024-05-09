package com.cg.farmirang.agency.feature.user.repository;

import com.cg.farmirang.agency.feature.user.entity.MemberRole;

public interface MemberRepositoryCustom {
	Integer changeRole(Integer memberId, MemberRole role);
}
