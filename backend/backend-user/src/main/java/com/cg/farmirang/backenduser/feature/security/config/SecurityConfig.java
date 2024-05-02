package com.cg.farmirang.backenduser.feature.security.config;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Arrays;
import java.util.UUID;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.cg.farmirang.backenduser.feature.security.dto.common.CustomOAuth2User;
import com.cg.farmirang.backenduser.feature.security.dto.request.JwtCreateTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.service.CustomOAuth2UserService;
import com.cg.farmirang.backenduser.feature.security.service.JwtService;
import com.cg.farmirang.backenduser.feature.security.utils.InstantAdapter;
import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.cg.farmirang.backenduser.global.common.code.ErrorCode;
import com.cg.farmirang.backenduser.global.common.response.ErrorResponse;
import com.google.gson.GsonBuilder;

import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

	private final CustomOAuth2UserService customUserService;
	private final JwtService jwt;
	private final RedirectStrategy redirectStrategy;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable);
		http.authorizeHttpRequests(authorize -> authorize
			/* swagger, oauth2 login uri 예외 처리 */
			.requestMatchers(
				new AntPathRequestMatcher("/swagger-ui/**"),
				new AntPathRequestMatcher("/v3/api-docs/**"),
				new AntPathRequestMatcher("/login/oauth2/**"),
				new AntPathRequestMatcher("/api/v1/user/**"),
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
				.successHandler(authenticationSuccessHandler())
				.failureHandler(authenticationFailureHandler())
		);
		//TODO: 로그아웃 때 여기서 JWT를 폐기해보자
		return http.build();
	}

	@Bean
	public AuthenticationFailureHandler authenticationFailureHandler() {
		var gson = new GsonBuilder().registerTypeAdapter(Instant.class, new InstantAdapter()).create();
		return (req, res, e) -> {
			var errorResponse = ErrorResponse.of(ErrorCode.WRONG_TOKEN_ERROR, Arrays.toString(e.getStackTrace()));
			res.setStatus(401);
			res.setContentType(MediaType.APPLICATION_JSON_VALUE);
			var out = res.getWriter();
			out.write(gson.toJson(errorResponse));
			out.flush();
		};
	}

	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler() {
		return (req, res, auth) -> {
			// get CustomOAuth2User
			CustomOAuth2User user = (CustomOAuth2User) auth.getPrincipal();
			var cookie = req.getCookies();
			String devideId = req.getHeader("device-id");
			// if device-id is not in header, find it in cookie
			if(devideId != null && !devideId.isBlank() && cookie != null) {
				for (var c : cookie) {
					if(c.getName().equals("device-id")) {
						devideId = c.getValue();
						break;
					}
				}
			} else {
				// if device-id is not in header and cookie, create new device-id
				devideId = UUID.randomUUID().toString();
			}
			// create jwt
			var attributes = user.getAttributes();
			var dto = JwtCreateTokenRequestDto.builder()
				.memberId((Integer)attributes.get("member_id"))
				.nickname((String)attributes.get("nickname"))
				.role((MemberRole)attributes.get("role"))
				.deviceId(devideId)
				.build();
			var token = jwt.createToken(dto);

			// add device-id to cookie
			var resCookie = new Cookie("device-id", devideId);
			resCookie.setPath("/");
			resCookie.setMaxAge(60 * 60 * 24 * 61);
			resCookie.setHttpOnly(true);
			resCookie.setSecure(true);
			resCookie.setAttribute("SameSite", "None");
			res.addCookie(resCookie);

			res.addCookie(createCookie("access-token", token.accessToken()));
			res.addCookie(createCookie("refresh-token", token.refreshToken()));
			res.addCookie(createCookie("expires-in", String.valueOf(token.expiresIn())));
			res.addCookie(createCookie("refresh-expires-in", String.valueOf(token.refreshExpiresIn())));
			res.addCookie(createCookie("token-type", token.tokenType()));
			res.addCookie(createCookie("member-id", dto.memberId().toString()));
			res.addCookie(createCookie("nickname", dto.nickname()));
			res.addCookie(createCookie("role", dto.role().name()));
			res.addCookie(createCookie("profile-img", (String)attributes.get("profile_img")));


			redirectStrategy.sendRedirect(req, res, "http://localhost:5173/result");
		};
	}

	private Cookie createCookie(String key, String value) {
		var encode = URLEncoder.encode(value.trim(), StandardCharsets.UTF_8).replaceAll("\\+", "%20");
		var cookie = new Cookie(key, encode);
		cookie.setPath("/");
		cookie.setMaxAge(60*2);
		return cookie;
	}


}
