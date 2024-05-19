package com.cg.farmirang.farm.feature.field.dto.request;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FieldCreateRequestDto {
	private String title;
	private String content;
	private String address;
	private LocalDateTime startAt;
	private Integer user;
	private Long design;
	private String iot;
}
