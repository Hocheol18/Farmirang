package com.cg.farmirang.backenduser.feature.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "AdminUserListServiceRequestDto", description = "관리자 유저 리스트 요청 DTO")
public record AdminUserListServiceRequestDto(
	@NotNull
	@Schema(description = "시작 회원 번호", example = "1")
	Integer cursor,
	@NotNull
	@Schema(description = "페이지 크기", example = "10")
	Integer size
) {
}
