package com.cg.farmirang.backenduser.feature.security.config;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

	@Value("${com.farmirang.user.login.location}")
	private String loginLocation;
	@Value("${com.farmirang.user.login.redirect}")
	private String loginRedirect;
	@Value("${com.farmirang.user.login.redirect.host}")
	private String loginResultHost;
	@Value("${com.farmirang.user.login.redirect.success}")
	private String loginResultSuccess;
	@Value("${com.farmirang.user.login.redirect.cancel}")
	private String loginResultCancel;

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
				new AntPathRequestMatcher("/v1/user/**"),
				new AntPathRequestMatcher("/v1/security/**"),
				new AntPathRequestMatcher("/oauth2/**")
			)
			.permitAll()
			.anyRequest()
			.permitAll());
		/*
		 * loginProcessingUrl 은 redirect uri 수정할 때 사용
		 * loginPage는 로그인 페이지로 이동(Controller가 있는듯?) 따라서 해당 경로에 맞는 적절한 html파일이 없으면 NoResourceFoundException 발생
		 * */
		http.oauth2Login(
			oauth2 -> oauth2
				.loginPage("/v1/security/login")
				.authorizationEndpoint(authorization -> authorization.baseUri(loginLocation))
				.redirectionEndpoint(redirection -> redirection.baseUri(loginRedirect))
				.userInfoEndpoint(userInfo -> userInfo.userService(customUserService))
				.successHandler(authenticationSuccessHandler())
				.failureHandler(authenticationFailureHandler())
		);
		return http.build();
	}

	@Bean
	public AuthenticationFailureHandler authenticationFailureHandler() {
		// var gson = new GsonBuilder().registerTypeAdapter(Instant.class, new InstantAdapter()).create();
		return (req, res, e) -> {
			log.debug("SecurityConfig AuthenticationFailureHandler: {}", e.getMessage());
			log.warn("SecurityConfig AuthenticationFailureHandler: {}", Arrays.toString(e.getStackTrace()));
			var loginResult = loginResultHost + loginResultCancel;
			redirectStrategy.sendRedirect(req, res, loginResult);
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
				.profileImg((String)attributes.get("profile_img"))
				.deviceId(devideId)
				.build();
			var token = jwt.createToken(dto);

			// add device-id to cookie
			res.addCookie(createCookie("device-id", devideId));

			res.addCookie(createCookie("access-token", token.accessToken()));
			res.addCookie(createCookie("refresh-token", token.refreshToken()));
			res.addCookie(createCookie("expires-in", String.valueOf(token.expiresIn())));
			res.addCookie(createCookie("refresh-expires-in", String.valueOf(token.refreshExpiresIn())));
			res.addCookie(createCookie("token-type", token.tokenType()));
			res.addCookie(createCookie("member-id", dto.memberId().toString()));
			res.addCookie(createCookie("nickname", dto.nickname()));
			res.addCookie(createCookie("role", dto.role().name()));
			res.addCookie(createCookie("profile-img", (String)attributes.get("profile_img")));

			var loginResult = loginResultHost + loginResultSuccess;
			redirectStrategy.sendRedirect(req, res, loginResult);
		};
	}

	private Cookie createCookie(String key, String value) {
		var encode = URLEncoder.encode(value.trim(), StandardCharsets.UTF_8).replaceAll("\\+", "%20");
		var cookie = new Cookie(key, encode);
		cookie.setPath("/");
		cookie.setMaxAge(60*2);
		cookie.setAttribute("SameSite", "None");
		cookie.setSecure(true);
		return cookie;
	}


}
