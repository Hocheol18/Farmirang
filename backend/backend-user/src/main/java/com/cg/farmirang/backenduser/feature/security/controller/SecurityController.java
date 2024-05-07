package com.cg.farmirang.backenduser.feature.security.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.farmirang.backenduser.feature.security.dto.request.JwtReissueControllerDto;
import com.cg.farmirang.backenduser.feature.security.dto.request.JwtTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtCreateTokenResponseDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtValidateTokenResponseDto;
import com.cg.farmirang.backenduser.feature.security.service.JwtService;
import com.cg.farmirang.backenduser.global.common.code.ErrorCode;
import com.cg.farmirang.backenduser.global.common.code.SuccessCode;
import com.cg.farmirang.backenduser.global.common.response.SuccessResponse;
import com.cg.farmirang.backenduser.global.exception.BusinessExceptionHandler;

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
	public ResponseEntity<SuccessResponse<JwtCreateTokenResponseDto>> reissueTokenController(@RequestHeader("Authorization") String authorization, @CookieValue("Device-id") String deviceId, @RequestBody JwtReissueControllerDto dto) {
		log.info("/api/v1/security/token  JwtReissueControllerDto: {}", dto);
		if(!dto.grantType().equalsIgnoreCase("refresh_token")) throw new BusinessExceptionHandler("잘못된 요청입니다.", ErrorCode.BAD_REQUEST_ERROR);
		var token = JwtTokenRequestDto.builder().accessToken(authorization).refreshToken(dto.refreshToken()).deviceId(deviceId).build();
		var result = jwt.reissueToken(token);
		return ResponseEntity.ok(new SuccessResponse<>(result, SuccessCode.UPDATE_SUCCESS , "갱신 성공"));
	}


	/**
	 * 토큰 검증
	 * */
	@GetMapping("/validate")
	public ResponseEntity<SuccessResponse<JwtValidateTokenResponseDto>> validateTokenController(@RequestHeader("Access-token") String accessToken, @RequestHeader("Refresh-token") String refreshToken, @CookieValue("Device-id") String deviceId) {
		log.info("/api/v1/security/validate  accessToken: {}, refreshToken: {}, deviceId: {}", accessToken, refreshToken, deviceId);
		var dto = JwtTokenRequestDto.builder().accessToken(accessToken).refreshToken(refreshToken).deviceId(deviceId).build();
		var result = jwt.validateToken(dto);
		return ResponseEntity.ok(new SuccessResponse<>(result, SuccessCode.SELECT_SUCCESS, "검증 성공"));
	}


}
