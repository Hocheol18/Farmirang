package com.cg.farmirang.backenduser.feature.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record UserUpdateNicknameRequestDto(
	@NotBlank
	@Schema(description = "닉네임", example = "당근")
	String nickname
) {
}
