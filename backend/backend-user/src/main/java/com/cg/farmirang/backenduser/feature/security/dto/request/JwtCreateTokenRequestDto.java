package com.cg.farmirang.backenduser.feature.security.dto.request;

import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "JwtCreateTokenRequestDto", description = "JWT 토큰 생성 요청")
public record JwtCreateTokenRequestDto(
	@NotNull
	@Schema(description = "사용자 ID", example = "1")
	@JsonProperty("member_id")
	Integer memberId,
	@NotBlank
	@Schema(description = "사용자 닉네임", example = "파미랑")
	String nickname,
	@Schema(description = "사용자 프로필 이미지", example = "https://localhost/default.png")
	@JsonProperty("profile_img")
	@NotBlank
	String profileImg,
	@NotNull
	@Schema(description = "사용자 권한", example = "member")
	@Enumerated(EnumType.STRING)
	MemberRole role,
	@Schema(description = "기기 구분 번호", example = "1234")
	@JsonProperty("device_id")
	String deviceId
) {
}
