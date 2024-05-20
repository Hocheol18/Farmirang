package com.cg.farmirang.farm.feature.field.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cg.farmirang.farm.feature.field.dto.request.FieldModifyRequestDto;
import com.cg.farmirang.farm.feature.field.dto.request.FieldCreateRequestDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldGetDetailResponseDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldGetListResponseDto;
import com.cg.farmirang.farm.feature.field.entity.Field;
import com.cg.farmirang.farm.feature.field.entity.Member;
import com.cg.farmirang.farm.feature.field.repository.FieldRepository;
import com.cg.farmirang.farm.feature.field.repository.MemberRepository;
import com.cg.farmirang.farm.global.common.code.ErrorCode;
import com.cg.farmirang.farm.global.exception.BusinessExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FieldServiceImpl implements FieldService{

	private final FieldRepository fieldRepository;
	private final MemberRepository memberRepository;

	@Override
	@Transactional
	public Boolean insertField(FieldCreateRequestDto request) {
		try {
			Field field = Field.toEntity(request);
			fieldRepository.save(field);
			return true;
		}catch (DataIntegrityViolationException e){
			throw new BusinessExceptionHandler("user 또는 design 또는 IoT가 존재하지 않습니다.", ErrorCode.DATA_INTEGRITY_VIOLATION__ERROR);
		}
	}

	@Override
	@Transactional
	public Boolean updateField(FieldModifyRequestDto request, Integer userId, Long fieldId) {
		try {
			Field field = fieldRepository.findById(fieldId)
				.orElseThrow(
					() -> {
						throw new BusinessExceptionHandler("해당 텃밭이 존재하지 않습니다.", ErrorCode.NOT_FOUND_ERROR);
					}
				);
			if(userId != field.getMember().getId())throw new BusinessExceptionHandler("권한이 없습니다.", ErrorCode.FORBIDDEN_ERROR);
			field.update(request);
			fieldRepository.save(field);
			return true;
		}catch (DataIntegrityViolationException e){
			throw new BusinessExceptionHandler("user 또는 design 또는 IoT가 존재하지 않습니다.", ErrorCode.DATA_INTEGRITY_VIOLATION__ERROR);
		}
	}

	@Override
	@Transactional
	public Boolean deleteField(Integer userId, Long fieldId) {
		Field field = fieldRepository.findById(fieldId)
			.orElseThrow(
				() -> {
					throw new BusinessExceptionHandler("해당 텃밭이 존재하지 않습니다.", ErrorCode.NOT_FOUND_ERROR);
				}
			);
		if(userId != field.getMember().getId())throw new BusinessExceptionHandler("권한이 없습니다.", ErrorCode.FORBIDDEN_ERROR);
		fieldRepository.delete(field);
		return true;
	}

	@Override
	public FieldGetDetailResponseDto selectField(Integer userId, Long fieldId) {
		Field field = fieldRepository.findById(fieldId)
			.orElseThrow(
				() -> {
					throw new BusinessExceptionHandler("해당 텃밭이 존재하지 않습니다.", ErrorCode.NOT_FOUND_ERROR);
				}
			);
		if(userId != field.getMember().getId())throw new BusinessExceptionHandler("권한이 없습니다.", ErrorCode.FORBIDDEN_ERROR);
		return FieldGetDetailResponseDto.toDto(field);
	}

	@Override
	public FieldGetListResponseDto selectFields(Integer userId) {
		Member member = memberRepository.findById(userId)
			.orElseThrow(
				() -> {
					throw new BusinessExceptionHandler("해당 사용자가 존재하지 않습니다.", ErrorCode.NOT_FOUND_ERROR);
				}
			);
		List<Field> fields = member.getFields();
		List<FieldGetDetailResponseDto> result = new ArrayList<>();
		for (Field field : fields) {
			result.add(FieldGetDetailResponseDto.toDto(field));
		}
		return FieldGetListResponseDto.builder().fields(result).build();
	}
}
