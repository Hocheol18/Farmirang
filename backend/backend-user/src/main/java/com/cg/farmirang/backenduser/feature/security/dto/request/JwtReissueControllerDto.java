package com.cg.farmirang.backenduser.feature.security.dto.request;

import org.hibernate.validator.constraints.Normalized;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(description = "토큰 재발급 요청")
public record JwtReissueControllerDto(
	@NotBlank
	@Schema(description = "리프레시 토큰", example = "aaa.aa.aaa")
	@JsonProperty("refresh_token")
	String refreshToken,
	@NotBlank
	@Schema(description = "요청 타입, refresh_token으로 고정", example = "refresh_token")
	@JsonProperty("grant_type")
	String grantType
) {
}
