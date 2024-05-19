package com.cg.farmirang.backenduser.feature.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(name = "UserUpdateNicknameResponseDto", description = "사용자 닉네임 업데이트 응답 DTO")
public record UserUpdateNicknameResponseDto(
	@Schema(description = "닉네임", example = "nickname")
	@NotBlank
	String nickname
) {
}
