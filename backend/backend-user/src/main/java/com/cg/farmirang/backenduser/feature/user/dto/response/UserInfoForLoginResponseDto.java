package com.cg.farmirang.backenduser.feature.user.dto.response;

import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "UserInfoForLoginResponseDto", description = "사용자 고유번호 응답 DTO")
public record UserInfoForLoginResponseDto(
	@NotNull
	@Schema(description = "사용자 고유 번호", example = "1")
	@JsonProperty("member_id")
	Integer memberId,
	@NotNull
	@Schema(description = "사용자 권한", example = "member")
	@Enumerated(EnumType.STRING)
	MemberRole role,
	@Schema(description = "사용자 닉네임", example = "부추")
	@JsonProperty("nickname")
	@NotBlank
	String nickname,
	@Schema(description = "사용자 프로필 이미지", example = "https://localhost/default.png")
	@JsonProperty("profile_img")
	@NotBlank
	String profileImg

) {
}
