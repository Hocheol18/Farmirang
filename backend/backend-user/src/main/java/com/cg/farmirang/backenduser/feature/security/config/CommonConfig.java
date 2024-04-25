package com.cg.farmirang.backenduser.feature.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;

@Configuration
public class CommonConfig {
	@Bean
	public DefaultOAuth2UserService defaultOAuth2UserService() {
		return new DefaultOAuth2UserService();
	}
}
