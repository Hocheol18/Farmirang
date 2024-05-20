package com.cg.farmirang.farm.feature.recommend.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.farmirang.farm.feature.field.dto.request.FieldCreateRequestDto;
import com.cg.farmirang.farm.feature.recommend.dto.request.RecoFertilizerRequestDto;
import com.cg.farmirang.farm.feature.recommend.dto.request.RecoPesticideRequestDto;
import com.cg.farmirang.farm.feature.recommend.dto.response.RecoFertilizerResponseDto;
import com.cg.farmirang.farm.feature.recommend.dto.response.RecoPesticideResponseDto;
import com.cg.farmirang.farm.feature.recommend.service.RecommendService;
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
@RequestMapping("/api/v1/recommend")
@Tag(name = "recommend", description = "추천 API")
public class RecommendController {

	private final RecommendService recommendService;

	@PostMapping("/pesticide")
	@Operation(summary = "농약 추천", description = "입력된 내용으로 농약을 추천합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "농약 추천에 성공했습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> recoPesticide(@Validated @RequestBody RecoPesticideRequestDto request) {
		RecoPesticideResponseDto result = recommendService.recoPesticide(request);
		return SuccessResponse.builder().data(result).status(SuccessCode.SELECT_SUCCESS).build();
	}

	@PostMapping("/fertilizer")
	@Operation(summary = "비료 추천", description = "입력된 내용으로 비료를 추천합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "비료 추천에 성공했습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> recoFertilizer(@Validated @RequestBody RecoFertilizerRequestDto request) {
		RecoFertilizerResponseDto result = recommendService.recoFertilizer(request);
		return SuccessResponse.builder().data(result).status(SuccessCode.SELECT_SUCCESS).build();
	}
}