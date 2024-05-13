package com.cg.farmirang.donation.feature.donation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.farmirang.donation.feature.donation.dto.request.RegisterDonationRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.DeleteDonationResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonationListResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.RegisterDonationResponseDto;
import com.cg.farmirang.donation.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/v1/donation")
public class DonationController {


	/**
	 * 기부 신청글 등록
	 * */
	@PostMapping
	public ResponseEntity<SuccessResponse<RegisterDonationResponseDto>> registerDonationController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken,
		@RequestBody RegisterDonationRequestDto data
	) {
		return null;
	}

	/**
	 * 기부 신청글 삭제
	 * */
	@DeleteMapping
	public ResponseEntity<SuccessResponse<DeleteDonationResponseDto>> deleteDonationController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken,
		@RequestParam("id") Integer boardId
	){
		return null;

	}

	/**
	 * 기부 신청글 목록 조회
	 * */
	@GetMapping
	public ResponseEntity<SuccessResponse<GetDonationListResponseDto>> getDonationListController(
		@RequestParam(value = "cursor", required = false) Integer cursor,
		@RequestParam(value = "size", required = false) Integer size,
		@RequestParam(value = "user", required = false) Integer memberId
	){
		return null;
	}

	/**
	 * 기부 신청글 상세조회
	 * */
	@GetMapping("/{id}")
	public ResponseEntity<SuccessResponse<?>> getDonationDetailController(
		@PathVariable("id") Integer donationId
	){
		return null;
	}





}
