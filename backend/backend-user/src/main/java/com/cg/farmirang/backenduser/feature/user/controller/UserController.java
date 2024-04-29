package com.cg.farmirang.backenduser.feature.user.controller;


import java.util.Collection;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.farmirang.backenduser.global.common.code.SuccessCode;
import com.cg.farmirang.backenduser.global.common.response.SuccessResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/user")
public class UserController {

	private final OAuth2AuthorizedClientService authorizedClientService;


	@GetMapping("/test/user")
	public ResponseEntity<SuccessResponse<OAuth2User>> testUser(@AuthenticationPrincipal OAuth2User user) {
		log.info("/api/v1/user/test/user  OAuth2User: {}", user);

		return ResponseEntity.ok(new SuccessResponse<>(user, SuccessCode.SELECT_SUCCESS, ""));
	}

	@GetMapping("/test/context")
	public ResponseEntity<SuccessResponse<SecurityContext>> testContext() {
		var context = SecurityContextHolder.getContext();
		log.info("/api/v1/user/test/context  SecurityContext: {}", context);
		return ResponseEntity.ok(new SuccessResponse<>(context, SuccessCode.SELECT_SUCCESS, ""));
	}

	@GetMapping("/test/client")
	public ResponseEntity<SuccessResponse<OAuth2AuthorizedClient>> testClient(){
		var context = SecurityContextHolder.getContext();
		var authentication = context.getAuthentication();
		var provider = ((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId();
		log.info("/api/v1/user/test/client  provider: {}", provider);
		var oAuth2AuthorizedClient = authorizedClientService.loadAuthorizedClient(provider, authentication.getName());
		log.info("/api/v1/user/test/client  OAuth2AuthorizedClient: {}", oAuth2AuthorizedClient);
		return ResponseEntity.ok(new SuccessResponse<>(oAuth2AuthorizedClient, SuccessCode.SELECT_SUCCESS, ""));
	}

	@GetMapping("/test/authorities")
	public ResponseEntity<SuccessResponse<Collection<? extends GrantedAuthority>>> testAuthorities(@AuthenticationPrincipal OAuth2User user) {
		var authorities = user.getAuthorities();
		log.info("/api/v1/user/test/authorities  authorities: {}", authorities);
		return ResponseEntity.ok(new SuccessResponse<>(authorities, SuccessCode.SELECT_SUCCESS, ""));
	}

}
