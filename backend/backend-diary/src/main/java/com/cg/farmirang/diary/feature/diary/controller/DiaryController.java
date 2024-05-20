package com.cg.farmirang.diary.feature.diary.controller;

import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.diary.feature.diary.dto.request.CreateDiaryMRequest;
import com.cg.farmirang.diary.feature.diary.dto.request.ModifyDiaryMRequest;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryDetailResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryMResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryTotalResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.MakeCalendarResponse;
import com.cg.farmirang.diary.feature.diary.service.DiaryService;
import com.cg.farmirang.diary.global.common.code.SuccessCode;
import com.cg.farmirang.diary.global.common.response.ErrorResponse;
import com.cg.farmirang.diary.global.common.response.SuccessResponse;

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
@RequestMapping("/api/v1/diary")
@Tag(name = "diary", description = "일지 API")
public class DiaryController {
	private final DiaryService diaryService;

	@PostMapping(value = "/manual", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Operation(summary = "수동 일지 생성", description = "입력된 내용으로 수동 일지를 생성합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "수동 일지 생성을 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "404", description = "해당 일지가 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "411", description = "수동 일지가 이미 존재합니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> createDiaryManual(@RequestPart MultipartFile image, @Validated @RequestPart CreateDiaryMRequest request) {
		Boolean result = diaryService.insertDiaryManual(image, request);
		return SuccessResponse.builder().data(result).status(SuccessCode.INSERT_SUCCESS).build();
	}

	@PutMapping(value = "/manual/{manualId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Operation(summary = "수동 일지 수정", description = "입력된 내용으로 수동 일지를 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "수동 일지 수정을 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "404", description = "해당 수동 일지가 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> modifyDiaryManual(@PathVariable Long manualId, @RequestPart MultipartFile image, @Validated @RequestPart ModifyDiaryMRequest request) {
		Boolean result = diaryService.updateDiaryManual(manualId, image, request);
		return SuccessResponse.builder().data(result).status(SuccessCode.UPDATE_SUCCESS).build();
	}

	@GetMapping(value = "/manual/{manualId}")
	@Operation(summary = "수동 일지 조회", description = "입력된 내용으로 수동 일지를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "수동 일지 조회를 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "404", description = "해당 수동 일지가 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> getDiaryManual(@PathVariable Long manualId) {
		GetDiaryMResponse result = diaryService.selectDiaryManual(manualId);
		return SuccessResponse.builder().data(result).status(SuccessCode.SELECT_SUCCESS).build();
	}

	@DeleteMapping(value = "/manual/{manualId}")
	@Operation(summary = "수동 일지 삭제", description = "입력된 내용으로 수동 일지를 삭제합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "수동 일지 삭제를 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> deleteDiaryManual(@PathVariable Long manualId) {
		Boolean result = diaryService.deleteDiaryManual(manualId);
		return SuccessResponse.builder().data(result).status(SuccessCode.SELECT_SUCCESS).build();
	}


	@GetMapping(value = "/total/{totalId}")
	@Operation(summary = "종합 일지 조회", description = "입력된 내용으로 종합 일지를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "종합 일지 조회를 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "404", description = "해당 종합 일지가 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> getDiaryTotal(@PathVariable Long totalId) {
		GetDiaryTotalResponse result = diaryService.selectDiaryTotal(totalId);
		return SuccessResponse.builder().data(result).status(SuccessCode.SELECT_SUCCESS).build();
	}

	@GetMapping(value = "/calendar/{fieldId}")
	@Operation(summary = "달력을 생성", description = "입력된 내용으로 달력을 생성합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "달력 생성을 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> makeCalendar(@PathVariable Long fieldId, @RequestParam Integer year, @RequestParam Integer month) {
		MakeCalendarResponse result = diaryService.makeCalendar(fieldId, year, month);
		return SuccessResponse.builder().data(result).status(SuccessCode.SELECT_SUCCESS).build();
	}

	@GetMapping(value = "/diary/{diaryId}")
	@Operation(summary = "일지 조회", description = "입력된 내용으로 일지를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "일지 조회를 성공하였습니다."),
		@ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
		@ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
	})
	public SuccessResponse<?> getDiaryDetail(@PathVariable Long diaryId) {
		GetDiaryDetailResponse result = diaryService.selectDiaryDetail(diaryId);
		return SuccessResponse.builder().data(result).status(SuccessCode.SELECT_SUCCESS).build();
	}
}
