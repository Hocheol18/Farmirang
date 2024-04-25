package com.cg.farmirang.backenduser.global.config;

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

import com.google.gson.GsonBuilder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

	private final OAuth2AuthorizedClientService authorizedClientService;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable);
		http.authorizeHttpRequests(authorize -> authorize
			/* swagger 예외 처리 */
			.requestMatchers(new AntPathRequestMatcher("/swagger-ui/**"), new AntPathRequestMatcher("/v3/api-docs/**"))
			.permitAll()
			.anyRequest()
			.authenticated());
		http.oauth2Login(oauth2 -> oauth2.successHandler(authenticationSuccessHandler()));
		return http.build();
	}

	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler() {
		var gson = new GsonBuilder().registerTypeAdapter(Instant.class, new InstantAdapter()).create();
		return (req, res, auth) -> {
			OAuth2AuthenticationToken token = (OAuth2AuthenticationToken)auth;
			OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(token.getAuthorizedClientRegistrationId(), token.getName());
			var map = new HashMap<String, Object>();
			map.put("client", authorizedClient);
			map.put("idToken", token.getAuthorities());
			var tokenString = gson.toJson(map);
			res.setContentType(MediaType.APPLICATION_JSON_VALUE);
			var out = res.getWriter();
			out.print(tokenString);
			out.flush();
		};
	}
}
