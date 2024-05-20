package com.cg.farmirang.backenduser.feature.user.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "AdminUserSocialLoginInfoDto", description = "관리자용 유저 소셜 로그인 정보")
public record AdminUserSocialLoginInfoDto(
	@NotNull
	@Schema(description = "소셜 로그인 구분 번호", example = "1")
	@JsonProperty("social_id")
	Integer socialId,
	@NotBlank
	@Schema(description = "소셜 로그인 제공자", example = "google")
	String provider,
	@NotBlank
	@Schema(description = "소셜 로그인 식별자", example = "1234567890")
	String sub
) {
}
