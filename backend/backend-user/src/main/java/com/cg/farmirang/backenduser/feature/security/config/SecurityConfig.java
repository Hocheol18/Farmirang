package com.cg.farmirang.backenduser.feature.security.config;

import java.time.Instant;
import java.util.HashMap;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.cg.farmirang.backenduser.feature.security.service.CustomOAuth2UserService;
import com.cg.farmirang.backenduser.feature.security.utils.InstantAdapter;
import com.google.gson.GsonBuilder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

	private final OAuth2AuthorizedClientService authorizedClientService;
	private final CustomOAuth2UserService customUserService;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable);
		http.authorizeHttpRequests(authorize -> authorize
			/* swagger, oauth2 login uri 예외 처리 */
			.requestMatchers(
				new AntPathRequestMatcher("/swagger-ui/**"),
				new AntPathRequestMatcher("/v3/api-docs/**"),
				new AntPathRequestMatcher("/login/oauth2/**"),
				new AntPathRequestMatcher("/api/v1/user/login/**"),
				new AntPathRequestMatcher("/oauth2/**")
			)
			.permitAll()
			.anyRequest()
			.authenticated());
		/*
		 * loginProcessingUrl 은 redirect uri 수정할 때 사용
		 * loginPage는 로그인 페이지로 이동(Controller가 있는듯?) 따라서 해당 경로에 맞는 적절한 html파일이 없으면 NoResourceFoundException 발생
		 * */
		//TODO: 인가코드 받는 oauth2/** 경로 /api/v1/user/oauth2/**으로 수정하기
		http.oauth2Login(
			oauth2 -> oauth2
				.userInfoEndpoint(userInfo -> userInfo.userService(customUserService))

		);
		//TODO: 로그아웃 때 여기서 JWT를 폐기해보자
		return http.build();
	}

	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler() {
		var gson = new GsonBuilder().registerTypeAdapter(Instant.class, new InstantAdapter()).create();
		return (req, res, auth) -> {

		};
	}


}
