package com.cg.farmirang.backenduser.feature.security.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "ParseRefreshTokenRequestDto", description = "파싱된 리프레시 토큰")
public record ParseRefreshTokenRequestDto(
	@Schema(description = "사용자 구분 번호", example = "1")
	Integer id,
	@Schema(description = "기기 구분 번호", example = "aa-aa-aa-aa")
	@JsonProperty("device_id")
	String deviceId
) {
}
