package com.cg.farmirang.backenduser.feature.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "AdminUserIdResponseDto", description = "관리자 유저 구분 번호")
public record AdminUserIdResponseDto(
	@Schema(description = "유저 구분 번호", example = "1")
	Integer id
) {
}
