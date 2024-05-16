package com.cg.farmirang.farm.feature.field.dto.response;

import java.time.LocalDateTime;

import com.cg.farmirang.farm.feature.field.entity.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FieldGetDetailResponseDto {
	private Long fieldId;
	private String title;
	private String content;
	private String address;
	private LocalDateTime startAt;
	private Long design;
	private String iot;

	public static FieldGetDetailResponseDto toDto(Field field){
		return FieldGetDetailResponseDto.builder()
			.fieldId(field.getId())
			.title(field.getTitle())
			.content(field.getContent())
			.address(field.getAddress())
			.startAt(field.getStartAt())
			.design(field.getDesign().getId())
			.iot(field.getIot().getId()).build();
	}
}
