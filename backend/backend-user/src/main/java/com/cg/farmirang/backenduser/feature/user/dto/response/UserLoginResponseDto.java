package com.cg.farmirang.backenduser.feature.user.dto.response;

import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(name = "UserLoginResponseDto", description = "소셜 로그인 성공 후 응답되는 DTO")
public record UserLoginResponseDto(
	@NotBlank
	@Schema(name = "액세스 토큰")
	@JsonProperty("access_token")
	String accessToken,
	@NotBlank
	@Schema(name = "리프레시 토큰")
	@JsonProperty("refresh_token")
	String refreshToken,
	@NotBlank
	@Schema(name = "액세스 토큰 만료 시간")
	@JsonProperty("expires_in")
	Integer expiresIn,
	@NotBlank
	@Schema(name = "리프레시 토큰 만료 시간")
	@JsonProperty("refresh_expires_in")
	Integer refreshExpiresIn,
	@NotBlank
	@Schema(name = "사용자 고유 번호")
	Integer id,
	@NotBlank
	@Schema(name = "사용자 닉네임")
	String nickname,
	@NotBlank
	@Schema(name = "사용자 권한")
	@Enumerated(EnumType.STRING)
	MemberRole role,
	@NotBlank
	@Schema(name = "프로필 이미지")
	@JsonProperty("profile_img")
	String profileImg
) {
}
