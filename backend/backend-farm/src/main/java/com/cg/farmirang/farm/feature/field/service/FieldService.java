package com.cg.farmirang.farm.feature.field.service;

import com.cg.farmirang.farm.feature.field.dto.request.FieldModifyRequestDto;
import com.cg.farmirang.farm.feature.field.dto.request.FieldCreateRequestDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldGetDetailResponseDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldGetListResponseDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldHarvestResponseDto;

public interface FieldService {
	public Boolean insertField(FieldCreateRequestDto request);
	public Boolean updateField(FieldModifyRequestDto request, Integer userId, Long fieldId);
	public Boolean deleteField(Integer userId, Long fieldId);
	public FieldGetDetailResponseDto selectField(Integer userId, Long fieldId);
	public FieldGetListResponseDto selectFields(Integer userId);
}
