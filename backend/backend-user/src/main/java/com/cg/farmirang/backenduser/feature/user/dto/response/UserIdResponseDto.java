package com.cg.farmirang.backenduser.feature.user.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(name = "UserIdResponseDto", description = "사용자 고유번호 응답 DTO")
public record UserIdResponseDto(
	@NotBlank
	@Schema(description = "사용자 고유 번호", example = "1")
	@JsonProperty("member_id")
	Integer memberId
) {
}
