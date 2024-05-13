package com.cg.farmirang.agency.feature.agency.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.agency.feature.agency.dto.request.AdminAgencyListRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.request.AdminApproveRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.request.AgencyRegisterRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AdminAgencyDetailResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AdminAgencyListResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AdminApproveResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AgencyDetailResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AgencyProfileResponseDto;
import com.cg.farmirang.agency.feature.agency.dto.response.AgencyRegisterResponseDto;
import com.cg.farmirang.agency.feature.agency.service.AgencyService;
import com.cg.farmirang.agency.feature.user.entity.MemberRole;
import com.cg.farmirang.agency.global.common.code.ErrorCode;
import com.cg.farmirang.agency.global.common.code.SuccessCode;
import com.cg.farmirang.agency.global.common.response.SuccessResponse;
import com.cg.farmirang.agency.global.common.service.JwtClient;
import com.cg.farmirang.agency.global.exception.BusinessExceptionHandler;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/v1/agency")
public class AgencyController {

	private final AgencyService svc;
	private final JwtClient jwt;

	/**
	 * 등록 신청
	 * */
	@PostMapping(value = "/registration", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {
		MediaType.APPLICATION_JSON_VALUE})
	@Operation(summary = " 기관 등록 신청", responses = {
		@ApiResponse(responseCode = "200", description = "성공, 기관 등록 번호 반환"),
		@ApiResponse(responseCode = "400", description = "실패")
	})
	public ResponseEntity<SuccessResponse<AgencyRegisterResponseDto>> registerAgencyController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String token,
		@RequestPart("data") AgencyRegisterRequestDto dto,
		@RequestPart("img") MultipartFile img) {
		log.debug("POST /registration registerAgencyController");
		var memberInfo = jwt.validateAccessToken(token);
		var res = svc.registerAgencyService(memberInfo.memberId(), dto, img);
		log.debug("AgencyController registerAgencyController res: {}", res.id());
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.INSERT_SUCCESS, "신청 완료"));
	}

	/**
	 * 등록 삭제
	 * */
	@DeleteMapping("/registration")
	@Operation(summary = "기관 등록 삭제", responses = {
		@ApiResponse(responseCode = "200", description = "성공, 기관 등록 번호 반환"),
		@ApiResponse(responseCode = "400", description = "실패")
	})
	public ResponseEntity<SuccessResponse<AgencyRegisterResponseDto>> cancelAgencyRegistrationController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String token, @RequestParam("id") Integer id) {
		log.debug("DELETE /registration cancelAgencyRegistrationController");
		var memberInfo = jwt.validateAccessToken(token);
		var res = svc.agencyRegistrationCancelService(memberInfo.memberId(), id);
		log.debug("AgencyController cancelAgencyRegistrationController res: {}", res.id());
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.DELETE_SUCCESS, "삭제 완료"));
	}

	/**
	 * 내 등록 조회
	 * */
	@GetMapping("/registration")
	@Operation(summary = "내 등록 조회", responses = {
		@ApiResponse(responseCode = "200", description = "성공, 기관 등록 정보 반환"),
		@ApiResponse(responseCode = "400", description = "실패")
	})
	public ResponseEntity<SuccessResponse<AgencyDetailResponseDto>> agencyInfoController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String token) {
		log.debug("GET /registration agencyInfoController");
		var memberInfo = jwt.validateAccessToken(token);
		var res = svc.agencyDetailService(memberInfo.memberId());
		log.debug("AgencyController agencyInfoController res: {}", res.name());
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.SELECT_SUCCESS, "조회 완료"));
	}

	/**
	 * 기관 프로필 조회
	 * */
	@GetMapping("/profile/{memberId}")
	@Operation(summary = "기관 프로필 조회", description = "기관 등록 번호가 아닌 유저 구분 번호를 입력하세요", responses = {
		@ApiResponse(responseCode = "200", description = "성공, 기관 프로필 정보 반환"),
		@ApiResponse(responseCode = "400", description = "실패")
	})
	public ResponseEntity<SuccessResponse<AgencyProfileResponseDto>> agencyProfileController(
		@PathVariable Integer memberId) {
		log.debug("GET /profile/{memberId} agencyProfileController");
		var res = svc.agencyProfileService(memberId);
		log.debug("AgencyController agencyProfileController res: {}", res.name());
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.SELECT_SUCCESS, "조회 완료"));
	}

	/**
	 * 운영자 신청 목록 조회
	 * */
	@GetMapping("/admin")
	@Operation(summary = "운영자 신청 목록 조회", responses = {
		@ApiResponse(responseCode = "200", description = "성공, 기관 신청 목록 반환"),
		@ApiResponse(responseCode = "400", description = "실패")
	})
	public ResponseEntity<SuccessResponse<AdminAgencyListResponseDto>> adminAgencyListController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String token,
		@RequestParam(value = "cursor", required = false) Integer cursor,
		@RequestParam(value = "size", required = false) Integer size) {
		var memberInfo = jwt.validateAccessToken(token);
		if (memberInfo.role() != MemberRole.ADMIN)
			throw new BusinessExceptionHandler("권한이 없습니다.", ErrorCode.FORBIDDEN_ERROR);
		if (cursor == null)
			cursor = 0;
		if (size == null)
			size = 10;
		log.debug("GET /admin adminAgencyListController, cursor: {}, size: {}", cursor, size);
		var req = AdminAgencyListRequestDto.builder()
			.cursor(cursor)
			.size(size)
			.build();
		var res = svc.adminAgencyListService(req);
		log.debug("AgencyController adminAgencyListController res size: {}", res.agencies().size());
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.SELECT_SUCCESS, "조회 완료"));
	}

	/**
	 * 운영자 신청 상세 조회
	 * */
	@GetMapping("/admin/{agencyId}")
	@Operation(summary = "운영자 신청 상세 조회", responses = {
		@ApiResponse(responseCode = "200", description = "성공, 기관 신청 상세 정보 반환"),
		@ApiResponse(responseCode = "400", description = "실패")
	})
	public ResponseEntity<SuccessResponse<AdminAgencyDetailResponseDto>> adminAgencyDetailController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String token,
		@PathVariable("agencyId") Integer agencyId) {
		var memberInfo = jwt.validateAccessToken(token);
		if (memberInfo.role() != MemberRole.ADMIN)
			throw new BusinessExceptionHandler("권한이 없습니다.", ErrorCode.FORBIDDEN_ERROR);
		log.debug("GET /admin/{agencyId} adminAgencyDetailController, agencyId: {}", agencyId);
		var res = svc.adminAgencyDetailService(agencyId);
		log.debug("AgencyController adminAgencyDetailController res: {}", res.name());
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.SELECT_SUCCESS, "조회 완료"));
	}

	/**
	 * 운영자 승인/거절
	 * */
	@PutMapping("/admin")
	@Operation(summary = "운영자 승인/거절", responses = {
		@ApiResponse(responseCode = "200", description = "성공, 기관 등록 번호 반환"),
		@ApiResponse(responseCode = "400", description = "실패")
	})
	public ResponseEntity<SuccessResponse<AdminApproveResponseDto>> adminApprovalController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String token, @RequestBody
	AdminApproveRequestDto data) {
		var memberInfo = jwt.validateAccessToken(token);
		if (memberInfo.role() != MemberRole.ADMIN)
			throw new BusinessExceptionHandler("권한이 없습니다.", ErrorCode.FORBIDDEN_ERROR);
		log.debug("PUT /admin adminApprovalController");
		var res = svc.adminApproveAgencyService(data);
		log.debug("AgencyController adminApprovalController res: {}", res.id());
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.UPDATE_SUCCESS, "처리 완료"));
	}

}
