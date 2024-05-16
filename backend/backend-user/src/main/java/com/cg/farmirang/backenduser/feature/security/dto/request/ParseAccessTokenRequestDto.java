package com.cg.farmirang.backenduser.feature.security.dto.request;

import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "ParseAccessTokenRequestDto", description = "액세스 토큰 파싱")
public record ParseAccessTokenRequestDto(
	@NotNull
	@Schema(description = "사용자 구분 번호", example = "1")
	Integer id,
	@NotNull
	@Schema(description = "사용자 권한", example = "MEMBER")
	@Enumerated(EnumType.STRING)
	MemberRole role,
	@NotBlank
	@Schema(description = "기기 구분 번호", example = "1234")
	@JsonProperty("device_id")
	String deviceId

) {
}
