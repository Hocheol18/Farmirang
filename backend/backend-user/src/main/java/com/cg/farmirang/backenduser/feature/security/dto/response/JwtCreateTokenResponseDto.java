package com.cg.farmirang.backenduser.feature.security.dto.response;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "JwtCreateTokenResponse", description = "JWT 토큰 생성 응답")
public record JwtCreateTokenResponseDto(
	@NotBlank
	@Schema(description = "액세스 토큰", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.6HlCHmX7X9y246no5Gbpgn6EzjaiwD-HZbnO0zBq4X8")
	@JsonProperty("access_token")
	String accessToken,
	@NotNull
	@Schema(description = "액세스 토큰 만료 시간", example = "1234")
	@JsonProperty("expires_in")
	Integer expiresIn,
	@NotBlank
	@Schema(description = "리프레시 토큰", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.6HlCHmX7X9y246no5Gbpgn6EzjaiwD-HZbnO0zBq4X8")
	@JsonProperty("refresh_token")
	String refreshToken,
	@NotNull
	@Schema(description = "리프레시 토큰 만료 시간", example = "1234")
	@JsonProperty("refresh_expires_in")
	Integer refreshExpiresIn,
	@NotBlank
	@Schema(description = "토큰 타입", example = "Bearer")
	@JsonProperty("token_type")
	String tokenType
) {

	// tokenType 기본값 생성
	public JwtCreateTokenResponseDto {
		if(Objects.isNull(tokenType)) {
			tokenType = "Bearer";
		}
	}
}
