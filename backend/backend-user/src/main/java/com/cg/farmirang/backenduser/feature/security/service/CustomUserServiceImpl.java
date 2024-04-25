package com.cg.farmirang.backenduser.feature.security.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.cg.farmirang.backenduser.feature.security.dto.common.CustomOAuth2User;
import com.cg.farmirang.backenduser.feature.security.dto.common.CustomOAuth2UserImpl;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserServiceImpl implements CustomUserService {

	private final DefaultOAuth2UserService defaultOAuth2UserService;

	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User user = defaultOAuth2UserService.loadUser(userRequest);
		CustomOAuth2User customOAuth2User = new CustomOAuth2UserImpl(user, userRequest);


		return customOAuth2User;
	}
}
