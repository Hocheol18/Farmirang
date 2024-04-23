package com.cg.farmirang.backenduser.feature.user.dto.common;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo {
	private Map<String, Object> attributes;

	@Override
	public String getProvider() {
		return "kakao";
	}

	@Override
	public String getSub() {
		return attributes.get("id").toString();
	}
}
