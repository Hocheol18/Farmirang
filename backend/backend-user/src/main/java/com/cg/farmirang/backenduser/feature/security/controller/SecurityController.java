package com.cg.farmirang.backenduser.feature.security.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.farmirang.backenduser.feature.security.dto.request.JwtReissueControllerDto;
import com.cg.farmirang.backenduser.feature.security.dto.request.JwtTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtCreateTokenResponseDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtValidateTokenResponseDto;
import com.cg.farmirang.backenduser.feature.security.service.JwtService;
import com.cg.farmirang.backenduser.global.common.code.ErrorCode;
import com.cg.farmirang.backenduser.global.common.code.SuccessCode;
import com.cg.farmirang.backenduser.global.common.response.SuccessResponse;
import com.cg.farmirang.backenduser.global.exception.BusinessExceptionHandler;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/security")
@Slf4j
public class SecurityController {
	private final JwtService jwt;

	/**
	 * 토큰 갱신
	 * */
	@PostMapping("/token")
	@Operation(description = "토큰을 갱신합니다, grant_type은 refresh_token으로 고정해주세요")
	public ResponseEntity<SuccessResponse<JwtCreateTokenResponseDto>> reissueTokenController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String authorization,
		@Valid @RequestBody JwtReissueControllerDto dto) {
		log.debug("POST /v1/security/token  JwtReissueControllerDto: {}", dto);
		if(!dto.grantType().equalsIgnoreCase("refresh_token")) throw new BusinessExceptionHandler("잘못된 요청입니다.", ErrorCode.BAD_REQUEST_ERROR);
		var token = JwtTokenRequestDto.builder().accessToken(authorization).refreshToken(dto.refreshToken()).build();
		var result = jwt.reissueToken(token);
		return ResponseEntity.ok(new SuccessResponse<>(result, SuccessCode.UPDATE_SUCCESS , "갱신 성공"));
	}


	/**
	 * 토큰 검증
	 * */
	@GetMapping("/validate")
	@Operation(description = "토큰을 검증합니다, access token, refresh token 각각 검증 가능합니다, 아래에 Access-token과 Refresh-token을 입력하면 헤더에 자동으로 들어갑니다")
	public ResponseEntity<SuccessResponse<JwtValidateTokenResponseDto>> validateTokenController(
		@RequestHeader(value = "Access-token", required = false) String accessToken,
		@RequestHeader(value = "Refresh-token", required = false) String refreshToken) {
		log.debug("GET /v1/security/validate  accessToken: {}, refreshToken: {}", accessToken, refreshToken);
		if(accessToken == null || accessToken.isBlank() ) accessToken = null;
		var dto = JwtTokenRequestDto.builder().accessToken(accessToken).refreshToken(refreshToken).build();
		var result = jwt.validateToken(dto);
		return ResponseEntity.ok(new SuccessResponse<>(result, SuccessCode.SELECT_SUCCESS, "검증 성공"));
	}

	@GetMapping("/logout")
	@Operation(description = "로그아웃 api입니다.")
	public ResponseEntity<SuccessResponse<JwtBooleanResponseDto>> logoutTestController(@Parameter(hidden = true) @RequestHeader("Authorization") String authorization) {
		log.debug("GET /v1/security/logout");
		var dto = JwtTokenRequestDto.builder().accessToken(authorization).build();
		var result = jwt.revokeToken(dto);
		return ResponseEntity.ok(new SuccessResponse<>(result, SuccessCode.SELECT_SUCCESS, "로그아웃 성공"));
	}


}
