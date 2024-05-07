package com.cg.farmirang.backenduser.feature.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(name = "UserUpdateImgResponseDto", description = "사용자 이미지 업데이트 응답 DTO")
public record UserUpdateImgResponseDto(
	@Schema(description = "이미지 URL", example = "http://localhost/profile.jpg")
	@NotBlank
	String url
) {

}
