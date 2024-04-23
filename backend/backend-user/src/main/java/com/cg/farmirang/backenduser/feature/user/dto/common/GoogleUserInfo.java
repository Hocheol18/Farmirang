package com.cg.farmirang.backenduser.feature.user.dto.common;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class GoogleUserInfo implements OAuth2UserInfo {
	private Map<String, Object> attributes;

	@Override
	public String getProvider() {
		return "google";
	}

	@Override
	public String getSub() {
		return  attributes.get("sub").toString();
	}
}
