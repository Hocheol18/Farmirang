package com.cg.farmirang.donation.feature.donation.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.donation.feature.donation.dto.request.ApproveDonorRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.request.RegisterDonorRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.ApproveDonorResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.DonorIdResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonorListResponseDto;
import com.cg.farmirang.donation.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/v1/donor")
public class DonorController {
	/**
	 * 후원 등록
	 * */
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Operation(summary = "후원 등록", description = "swagger로는 이미지 업로드 테스트 못해요")
	public ResponseEntity<SuccessResponse<DonorIdResponseDto>> registerDonorController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken,
		@RequestPart("data") RegisterDonorRequestDto data,
		@RequestPart("img") MultipartFile img
	){
		return null;
	}

	/**
	 * 후원 삭제
	 * */
	@DeleteMapping
	public ResponseEntity<SuccessResponse<DonorIdResponseDto>> deleteDonorController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken,
		@RequestParam(value = "id") Integer donorId
	){
		return null;
	}

	/**
	 * 후원 목록 조회
	 * */
	@GetMapping
	public ResponseEntity<SuccessResponse<GetDonorListResponseDto>> getDonorListController(
		@RequestParam("id") Integer donationId,
		@RequestParam(value = "cursor", required = false) Integer cursor,
		@RequestParam(value = "size", required = false) Integer size
	){
		return null;
	}

	/**
	 * 후원 승인/반려
	 * */
	@PutMapping
	public ResponseEntity<SuccessResponse<ApproveDonorResponseDto>> approveDonorController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken,
		@RequestBody ApproveDonorRequestDto data
	){
		return null;
	}
}
