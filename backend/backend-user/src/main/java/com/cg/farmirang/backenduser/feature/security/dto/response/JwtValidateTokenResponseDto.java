package com.cg.farmirang.backenduser.feature.security.dto.response;

import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "JwtValidateTokenResponseDto", description = "JWT 토큰 조회 응답")
public record JwtValidateTokenResponseDto(
	@NotNull
	@Schema(description = "사용자 ID", example = "1")
	@JsonProperty("member_id")
	Integer memberId,
	@NotNull
	@Schema(description = "사용자 권한", example = "member")
	@Enumerated(EnumType.STRING)
	MemberRole role,
	@NotBlank
	@Schema(description = "기기 구분 번호", example = "1234")
	@JsonProperty("device_id")
	String deviceId
) {
}
