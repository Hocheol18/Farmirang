package com.cg.farmirang.farm.feature.field.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FieldGetListResponseDto {
	List<FieldGetDetailResponseDto> fields;
}
