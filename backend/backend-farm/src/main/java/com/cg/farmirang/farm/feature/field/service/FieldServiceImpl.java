package com.cg.farmirang.farm.feature.field.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cg.farmirang.farm.feature.field.dto.request.FieldModifyRequestDto;
import com.cg.farmirang.farm.feature.field.dto.request.FieldCreateRequestDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldCreateResponseDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldGetDetailResponseDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldGetListResponseDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldHarvestResponseDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldModifyResponseDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldRemoveResponseDto;
import com.cg.farmirang.farm.feature.field.entity.Field;
import com.cg.farmirang.farm.feature.field.repository.FieldRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FieldServiceImpl implements FieldService{

	private final FieldRepository fieldRepository;

	@Override
	@Transactional
	public Boolean insertField(FieldCreateRequestDto request) {
		try {
			Field field = Field.toEntity(request);
			fieldRepository.save(field);

		}catch (DataIntegrityViolationException e){

		}

		return null;
	}

	@Override
	public Boolean updateField(FieldModifyRequestDto request, Integer userId, Long fieldId) {
		return null;
	}

	@Override
	public Boolean deleteField(Long fieldId) {
		return null;
	}

	@Override
	public FieldGetDetailResponseDto selectField(Integer userId, Long fieldId) {
		return null;
	}

	@Override
	public FieldGetListResponseDto selectFields(Integer userId) {
		return null;
	}

	@Override
	public FieldHarvestResponseDto harvestField(Long fieldId) {
		return null;
	}
}
