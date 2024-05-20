package com.cg.farmirang.backenduser.feature.user.dto.response;

import java.time.LocalDateTime;

import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "UserInfoResponseDto", description = "사용자 정보 응답 DTO")
public record UserInfoResponseDto(
	@NotNull
	@Schema(description = "사용자 고유 번호", example = "1")
	@JsonProperty("member_id")
	Integer memberId,
	@NotBlank
	@Schema(description = "사용자 닉네임", example = "farmirang")
	String nickname,
	@NotBlank
	@Schema(description = "사용자 프로필 이미지", example = "http://localhost/profile.jpg")
	@JsonProperty("profile_img")
	String profileImg,
	@NotNull
	@Schema(description = "사용자 권한", example = "member")
	@Enumerated(EnumType.STRING)
	MemberRole role,
	@NotNull
	@Schema(description = "가입일", example = "2021-08-01T00:00:00")
	@JsonProperty("join_date")
	LocalDateTime joinDate,
	@NotNull
	@Schema(description = "뱃지", example = "0")
	Long badge
) {
}
