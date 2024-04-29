package com.cg.farmirang.backenduser.feature.security.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "JwtTokenRequestDto", description = "JWT 토큰 검증 DTO")
public record JwtTokenRequestDto(
	@Schema(description = "액세스 토큰", example = "a.a.a")
	@JsonProperty("access_token")
	String accessToken,
	@Schema(description = "리프레시 토큰", example = "r.r.r")
	@JsonProperty("refresh_token")
	String refreshToken,
	@Schema(description = "기기 구분 번호", example = "ddddd")
	@JsonProperty("device_id")
	String deviceId
) {
}
