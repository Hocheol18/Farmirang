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
import jakarta.validation.Valid;
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
		@Valid @RequestPart("data") RegisterDonorRequestDto data,
		@RequestPart("img") MultipartFile img
	){
		// TODO: log

		// TODO: validate token

		// TODO Service
		// TODO upload image and get url

		// TODO: create entity

		// TODO: save entity

		// TODO: return entity id
		return null;
	}

	/**
	 * 후원 삭제
	 * */
	@DeleteMapping
	@Operation(summary = "후원 삭제", description = "후원글 삭제")
	public ResponseEntity<SuccessResponse<DonorIdResponseDto>> deleteDonorController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken,
		@RequestParam(value = "id") Integer donorId
	){
		// TODO: log

		// TODO: validate token

		// TODO: check admin

		// TODO Service
		// TODO: find entity if null throw exception

		// TODO: get image url

		// TODO: delete entity but if approval is true, can't delete

		// TODO: delete image

		// TODO: return entity id
		return null;
	}

	/**
	 * 후원 목록 조회
	 * */
	@GetMapping
	@Operation(summary = "후원 목록 조회", description = "cursor은 시작 글번호, size는 불러올 최대 개수.")
	public ResponseEntity<SuccessResponse<GetDonorListResponseDto>> getDonorListController(
		@RequestParam("id") Integer donationId,
		@RequestParam(value = "cursor", required = false) Integer cursor,
		@RequestParam(value = "size", required = false) Integer size
	){
		// TODO: log
		// TODO: if cursor is null, set 0

		// TODO: if size is null, set 10

		// TODO Service
		// TODO: get list using querydsl

		// TODO: dynamic query with cusor, size

		// TODO: return list
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
		// TODO: log
		// TODO: validate token

		// TODO: if not agency, throw exception

		// TODO Service
		// TODO find entity(this is LIST!!!) if null throw exception

		// TODO: if approval is true, update approval, current amount, board progress, user badge

		// TODO: if approval is false, update approval

		// TODO: return entity id
		return null;
	}
}
