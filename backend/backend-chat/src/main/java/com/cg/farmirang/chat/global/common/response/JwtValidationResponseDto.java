package com.cg.farmirang.chat.global.common.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record JwtValidationResponseDto(
	@NotBlank
	@Schema(description = "사용자 ID", example = "1")
	@JsonProperty("member_id")
	Integer memberId,
	@NotBlank
	@Schema(description = "사용자 권한", example = "MEMBER")
	String role,
	@NotBlank
	@Schema(description = "기기 구분 번호", example = "1234")
	@JsonProperty("device_id")
	String deviceId
) {
}
