package com.cg.farmirang.agency.feature.agency.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record AgencyListInfoDto(
	@Schema(description = "기관 등록 번호", example = "1")
	Integer id,
	@Schema(description = "기관 이름", example = "파미랑복지센터")
	String name,
	@Schema(description = "승인 여부", example = "true")
	Boolean approval
) {

}
