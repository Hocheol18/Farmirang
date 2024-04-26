package com.cg.farmirang.backenduser.feature.security.dto.common;

import org.springframework.security.oauth2.core.user.OAuth2User;

public interface CustomOAuth2User extends OAuth2User {

	public String getSub();

	public String getProvider();

	public Integer getMemberId();

	public void setMemberId(Integer memberId);

}
