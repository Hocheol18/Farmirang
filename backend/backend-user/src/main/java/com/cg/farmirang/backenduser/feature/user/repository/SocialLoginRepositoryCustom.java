package com.cg.farmirang.backenduser.feature.user.repository;

import java.util.List;

import com.cg.farmirang.backenduser.feature.user.dto.response.AdminUserSocialLoginInfoDto;

public interface SocialLoginRepositoryCustom {
	Integer deleteByMemberId(Integer memberId);
	List<AdminUserSocialLoginInfoDto> getSocialLoginInfoList(Integer memberId);
}
