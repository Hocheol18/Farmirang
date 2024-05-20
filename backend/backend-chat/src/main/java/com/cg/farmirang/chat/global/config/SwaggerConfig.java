package com.cg.farmirang.chat.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
	@Bean
	public OpenAPI openAPI() {

		SecurityScheme accessTokenSecurityScheme = new SecurityScheme()
				.type(SecurityScheme.Type.HTTP).scheme("Bearer").bearerFormat("JWT")
				.in(SecurityScheme.In.HEADER).name("Authorization");
		SecurityScheme refreshTokenSecurityScheme = new SecurityScheme()
				.type(SecurityScheme.Type.APIKEY)
				.in(SecurityScheme.In.HEADER).name("Refresh-Token");



		SecurityRequirement securityRequirement = new SecurityRequirement().addList("Access Token (Bearer)").addList("Refresh Token");

		Components components = new Components()
				.addSecuritySchemes("Access Token (Bearer)", accessTokenSecurityScheme)
				.addSecuritySchemes("Refresh Token", refreshTokenSecurityScheme);

		return new OpenAPI()
				.info(apiInfo())
				.components(components)
				.addSecurityItem(securityRequirement);

	}

	private Info apiInfo() {
		return new Info()
			.title("Famirang Chat API")
			.description("Famirang Chat API Documentation")
			.version("1.0.0");
	}
}