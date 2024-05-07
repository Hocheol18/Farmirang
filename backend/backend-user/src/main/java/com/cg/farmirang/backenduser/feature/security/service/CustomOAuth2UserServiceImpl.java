package com.cg.farmirang.backenduser.feature.security.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.cg.farmirang.backenduser.feature.security.dto.common.CustomOAuth2User;
import com.cg.farmirang.backenduser.feature.security.dto.common.CustomOAuth2UserImpl;
import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.cg.farmirang.backenduser.feature.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserServiceImpl implements CustomOAuth2UserService {

	private final DefaultOAuth2UserService defaultSvc;
	private final UserService userSvc;

	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User user = defaultSvc.loadUser(userRequest);
		CustomOAuth2User customOAuth2User = new CustomOAuth2UserImpl(user, userRequest);

		var memberInfo = userSvc.registerService(customOAuth2User.getProvider(), customOAuth2User.getSub());

		if(memberInfo.role() == MemberRole.ANONYMOUS) throw new OAuth2AuthenticationException("익명 유저입니다");

		customOAuth2User.setAttributes(memberInfo);

		return customOAuth2User;
	}
}
