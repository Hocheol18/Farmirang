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
import com.cg.farmirang.donation.feature.donation.dto.request.GetDonorListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.request.RegisterDonorRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.ApproveDonorResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.DonorIdResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonorListResponseDto;
import com.cg.farmirang.donation.feature.donation.service.DonorService;
import com.cg.farmirang.donation.feature.user.entity.MemberRole;
import com.cg.farmirang.donation.global.common.code.ErrorCode;
import com.cg.farmirang.donation.global.common.code.SuccessCode;
import com.cg.farmirang.donation.global.common.response.SuccessResponse;
import com.cg.farmirang.donation.global.common.service.JwtClient;
import com.cg.farmirang.donation.global.exception.BusinessExceptionHandler;

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
	private final DonorService svc;
	private final JwtClient jwt;


	/**
	 * 후원 등록
	 * */
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Operation(summary = "후원 등록", description = "swagger로는 이미지 업로드 테스트 힘들어요")
	public ResponseEntity<SuccessResponse<DonorIdResponseDto>> registerDonorController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken,
		@Valid @RequestPart("data") RegisterDonorRequestDto data,
		@RequestPart("img") MultipartFile img
	){
		log.debug("POST /v1/donor:");
		// validate token
		var memberInfo = jwt.validateAccessToken(accessToken);
		// Service
		var result =  svc.registerDonorService(memberInfo.memberId(), data, img);
		return ResponseEntity.ok(new SuccessResponse<>(result, SuccessCode.INSERT_SUCCESS, "후원 등록 성공"));
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
		log.debug("DELETE /v1/donor: id={}", donorId);
		// validate token
		var memberInfo = jwt.validateAccessToken(accessToken);
		// check admin
		DonorIdResponseDto res = null;
		if(memberInfo.role() ==MemberRole.ADMIN)  res =  svc.deleteDonorAdminService(donorId);
		else res =  svc.deleteDonorService(memberInfo.memberId(), donorId);
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.DELETE_SUCCESS, "후원 삭제 성공"));
	}

	/**
	 * 후원 목록 조회
	 * */
	@GetMapping
	@Operation(summary = "후원 목록 조회", description = "id는 기부글 번호, cursor은 후원댓글 시작번호, size는 불러올 최대 개수.")
	public ResponseEntity<SuccessResponse<GetDonorListResponseDto>> getDonorListController(
		@RequestParam("id") Integer donationId,
		@RequestParam(value = "cursor", required = false) Integer cursor,
		@RequestParam(value = "size", required = false) Integer size
	){
		log.debug("GET /v1/donor: donationId={}", donationId);
		// if cursor is null, set 0
		if(cursor == null) cursor = 0;
		// if size is null, set 10
		if(size == null) size = 10;
		// Service
		var req = GetDonorListServiceRequestDto.builder().donationId(donationId).cursor(cursor).size(size).build();
		var res = svc.getDonorListService(req);
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.SELECT_SUCCESS, "후원 목록 조회 성공"));
	}

	/**
	 * 후원 승인/반려
	 * */
	@PutMapping
	@Operation(summary = "후원 승인/반려", description = "후원댓글 승인/반려")
	public ResponseEntity<SuccessResponse<ApproveDonorResponseDto>> approveDonorController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken,
		@Valid @RequestBody ApproveDonorRequestDto data
	){
		log.debug("PUT /v1/donor");
		// validate token
		var memberInfo = jwt.validateAccessToken(accessToken);
		// if not agency, throw exception
		if(memberInfo.role() != MemberRole.AGENCY) throw new BusinessExceptionHandler("권한이 없습니다",
			ErrorCode.FORBIDDEN_AGENCY_ERROR);
		// Service
		var res = svc.approveDonorService(memberInfo.memberId(), data);
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.UPDATE_SUCCESS, "후원 승인/반려 성공"));
	}
}
