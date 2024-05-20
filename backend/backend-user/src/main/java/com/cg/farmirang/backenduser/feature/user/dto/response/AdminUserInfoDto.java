package com.cg.farmirang.backenduser.feature.user.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "AdminUserInfoDto", description = "관리자 유저 정보")
public record AdminUserInfoDto(
	@NotNull
	@Schema(description = "유저 구분 번호", example = "1")
	Integer id,
	@NotBlank
	@Schema(description = "유저 닉네임", example = "닉네임")
	String nickname,
	@NotBlank
	@Schema(description = "유저 프로필 이미지", example = "https://localhost/profile.png")
	@JsonProperty("profile_img")
	String profileImg
) {
}
