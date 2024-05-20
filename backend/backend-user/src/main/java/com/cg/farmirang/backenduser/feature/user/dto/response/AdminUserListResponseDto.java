package com.cg.farmirang.backenduser.feature.user.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "AdminUserListResponseDto", description = "관리자용 유저 목록")
public record AdminUserListResponseDto(
	@NotEmpty
	@Schema(description = "유저 목록")
	List<AdminUserInfoDto> members,
	@NotNull
	@Schema(description = "마지막 유저 구분 번호", example = "5")
	Integer cursor
) {
}
