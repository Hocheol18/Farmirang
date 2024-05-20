package com.cg.farmirang.farm.feature.field.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.farmirang.farm.feature.field.dto.request.FieldCreateRequestDto;
import com.cg.farmirang.farm.feature.field.dto.request.FieldModifyRequestDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldGetDetailResponseDto;
import com.cg.farmirang.farm.feature.field.dto.response.FieldGetListResponseDto;
import com.cg.farmirang.farm.feature.field.service.FieldService;
import com.cg.farmirang.farm.global.common.code.SuccessCode;
import com.cg.farmirang.farm.global.common.response.ErrorResponse;
import com.cg.farmirang.farm.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/field")
@Tag(name = "field", description = "텃밭 API")
public class FieldController {

	private final FieldService fieldService;

	@PostMapping
	@Operation(summary = "텃밭 생성", description = "입력된 내용으로 텃밭을 생성합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "텃밭 생성을 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "410", description = "존재하지 않는 user, design, IoT를 사용하는 경우 발생합니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> createField(@Validated @RequestBody FieldCreateRequestDto request) {
		Boolean result = fieldService.insertField(request);
		return SuccessResponse.builder().data(result).status(SuccessCode.INSERT_SUCCESS).build();
	}

	@PutMapping("/{userId}/{fieldId}")
	@Operation(summary = "텃밭 수정", description = "입력된 내용으로 텃밭을 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "산책 등록을 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "404", description = "없는 텃밥입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> modifyField(@Validated @RequestBody FieldModifyRequestDto request, @PathVariable(name = "userId") Integer userId, @PathVariable(name = "fieldId") Long fieldId) {
		Boolean reusult = fieldService.updateField(request, userId, fieldId);
		return SuccessResponse.builder().data(reusult).status(SuccessCode.UPDATE_SUCCESS).build();
	}

	@GetMapping("/{userId}")
	@Operation(summary = "텃밭 목록 조회", description = "사용자 기반 텃밭 목록을 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "텃밭 목록을 조회를 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "404", description = "없는 사용자입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> getFields(@PathVariable(name = "userId") Integer userId) {
		FieldGetListResponseDto result = fieldService.selectFields(userId);
		return SuccessResponse.builder().data(result).status(SuccessCode.SELECT_SUCCESS).build();
	}

	@GetMapping("/{userId}/{fieldId}")
	@Operation(summary = "텃밭 상세 조회", description = "입력된 내용으로 텃밭을 상세 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "텃밭 상세 조회를 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "404", description = "없는 텃밥입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> getFieldDetail(@PathVariable(name = "userId") Integer userId, @PathVariable(name = "fieldId") Long fieldId) {
		FieldGetDetailResponseDto result = fieldService.selectField(userId, fieldId);
		return SuccessResponse.builder().data(result).status(SuccessCode.SELECT_SUCCESS).build();
	}

	@DeleteMapping("/{userId}/{fieldId}")
	@Operation(summary = "텃밭 삭제", description = "입력된 내용으로 텃밭을 삭제합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "산책 등록을 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "404", description = "없는 텃밥입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> removeField(@PathVariable(name = "userId") Integer userId, @PathVariable(name = "fieldId") Long fieldId) {
		Boolean result = fieldService.deleteField(userId, fieldId);
		return SuccessResponse.builder().data(result).status(SuccessCode.DELETE_SUCCESS).build();
	}
}
