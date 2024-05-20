package com.cg.farmirang.donation.feature.donation.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.donation.feature.donation.dto.request.GetDonationListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.request.RegisterDonationRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.DonationIdResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonationDetailResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonationListResponseDto;
import com.cg.farmirang.donation.feature.donation.service.DonationService;
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
@RequestMapping("/v1/donation")
public class DonationController {
	private final DonationService svc;
	private final JwtClient jwt;

	/**
	 * 기부 신청글 등록
	 * */
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Operation(summary = "기부 신청글 등록", description = "swagger에서는 이미지 업로드가 힘듭니다. postmane 같은 프로그램을 사용해 테스트해주세요")
	public ResponseEntity<SuccessResponse<DonationIdResponseDto>> registerDonationController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken,
		@Valid @RequestPart("data") RegisterDonationRequestDto data,
		@RequestPart("head") MultipartFile headerImg,
		@RequestPart("main") MultipartFile mainImg
	) {
		log.debug("POST /v1/donation");
		// validate token
		var validate = jwt.validateAccessToken(accessToken);
		// check role if not agency or admin, throw forbidden
		if (validate.role() != MemberRole.ADMIN && validate.role() != MemberRole.AGENCY)
			throw new BusinessExceptionHandler("권한이 없습니다",
				ErrorCode.FORBIDDEN_AGENCY_ERROR);
		// Service
		var res = svc.registerDonationService(validate.memberId(), data, headerImg, mainImg);
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.INSERT_SUCCESS, "등록 성공"));
	}

	/**
	 * 기부 신청글 삭제
	 * */
	@DeleteMapping
	@Operation(summary = "기부 신청글 삭제", description = "자기가 작성한 기부글을 삭제합니다. 운영자의 경우 상관없이 삭제가능합니다")
	public ResponseEntity<SuccessResponse<DonationIdResponseDto>> deleteDonationController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken,
		@RequestParam("id") Integer boardId
	){
		log.debug("DELETE /v1/donation, board id: {}", boardId);
		// validate token
		var memberInfo = jwt.validateAccessToken(accessToken);
		// check role whether admin or not
		DonationIdResponseDto result = null;
		if(memberInfo.role() == MemberRole.ADMIN) result =  svc.deleteDonationAdminService(boardId);
		else result =  svc.deleteDonationService(memberInfo.memberId(), boardId);

		return ResponseEntity.ok(new SuccessResponse<>(result, SuccessCode.DELETE_SUCCESS, "삭제 성공"));

	}

	/**
	 * 기부 신청글 목록 조회
	 * */
	@GetMapping
	@Operation(summary = "기부 신청글 목록 조회", description = "cursor는 시작번호, size는 불러올 최대 개수, user는 사용자 id")
	public ResponseEntity<SuccessResponse<GetDonationListResponseDto>> getDonationListController(
		@RequestParam(value = "cursor", required = false) Integer cursor,
		@RequestParam(value = "size", required = false) Integer size,
		@RequestParam(value = "user", required = false) Integer memberId
	){
		log.debug("GET /v1/donation, cursor: {}, size: {}, member id: {}", cursor, size, memberId);
		// if cursor is null, set 0
		if(cursor == null) cursor = 0;
		// if size is null, set 10
		if(size == null) size = 10;
		// Service
		var dto = GetDonationListServiceRequestDto.builder().cursor(cursor).size(size).memberId(memberId).build();
		var res = svc.getDonationListService(dto);
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.SELECT_SUCCESS, "조회 성공"));
	}

	/**
	 * 기부 신청글 상세조회
	 * */
	@GetMapping("/{id}")
	@Operation(summary = "기부 신청글 상세조회", description = "기부글 상세조회, id는 글 번호")
	public ResponseEntity<SuccessResponse<GetDonationDetailResponseDto>> getDonationDetailController(
		@PathVariable("id") Integer donationId
	){
		log.debug("GET /v1/donation/{}", donationId);
		// Service
		var res = svc.getDonationDetailService(donationId);
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.SELECT_SUCCESS, "조회 성공"));
	}





}
