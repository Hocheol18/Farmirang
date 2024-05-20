package com.cg.farmirang.backenduser.feature.security.dto.common;

import org.springframework.security.oauth2.core.user.OAuth2User;

import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoForLoginResponseDto;

public interface CustomOAuth2User extends OAuth2User {

	String getSub();

	String getProvider();

	Integer getMemberId();

	void setMemberId(Integer memberId);

	void setAttributes(UserInfoForLoginResponseDto dto);

}
