package com.cg.farmirang.backenduser.feature.user.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "AdminUserDetailResponseDto", description = "관리자 유저 상세 정보")
public record AdminUserDetailResponseDto(
	@NotNull
	@Schema(description = "유저 구분 번호", example = "1")
	Integer id,
	@NotBlank
	@Schema(description = "유저 닉네임", example = "닉네임")
	String nickname,
	@NotBlank
	@Schema(description = "유저 프로필 이미지", example = "https://localhost/profile.png")
	@JsonProperty("profile_img")
	String profileImg,
	@NotNull
	@Schema(description = "유저 역할", example = "MEMBER")
	@Enumerated(EnumType.STRING)
	MemberRole role,
	@NotNull
	@Schema(description = "가입일", example = "2021-01-01T00:00:00")
	@JsonProperty("join_date")
	LocalDateTime joinDate,
	@NotNull
	@Schema(description = "뱃지", example = "0")
	Long badge,
	@NotEmpty
	@Schema(description = "소셜 로그인 정보")
	@JsonProperty("social_logins")
	List<AdminUserSocialLoginInfoDto> socialLogins

) {
}
