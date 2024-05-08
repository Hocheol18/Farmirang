package com.cg.farmirang.backenduser.feature.user.controller;


import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.backenduser.feature.security.dto.request.JwtTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.service.JwtService;
import com.cg.farmirang.backenduser.feature.user.dto.request.UserUpdateNicknameRequestDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserAnotherInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserUpdateImgResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserUpdateNicknameResponseDto;
import com.cg.farmirang.backenduser.feature.user.service.UserService;
import com.cg.farmirang.backenduser.global.common.code.SuccessCode;
import com.cg.farmirang.backenduser.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/user")
@Slf4j
public class UserController {
	private final UserService svc;
	private final JwtService jwt;

	/**
	 * 회원 탈퇴
	 * */
	@DeleteMapping()
	public ResponseEntity<SuccessResponse<UserBooleanResponseDto>> withdrawalController(
		@Parameter(hidden = true) @RequestHeader("Authorization") String token,
		@Parameter(hidden = true) @CookieValue("device-id") String deviceId) {
		log.info("DELETE /v1/user : token: {}, deviceId: {}", token, deviceId);
		// validate token
		var validate = jwt.validateToken(JwtTokenRequestDto.builder().accessToken(token).deviceId(deviceId).build());
		// change user to anonymous
		svc.withdrawService(validate.memberId());
		// delete refresh token
		jwt.revokeToken(JwtTokenRequestDto.builder().accessToken(token).deviceId(deviceId).build());
		var res = UserBooleanResponseDto.builder().result(true).build();
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.DELETE_SUCCESS, "회원 탈퇴 성공"));
	}

	/**
	 * 내 정보 조회
	 * */
	@GetMapping("/userinfo")
	public ResponseEntity<SuccessResponse<UserInfoResponseDto>> userInfoController(@Parameter(hidden = true) @RequestHeader("Authorization") String token) {
		log.info("GET /v1/user/userinfo : token: {}", token);
		// validate token
		var memberInfo = jwt.validateToken(JwtTokenRequestDto.builder().accessToken(token).build());
		// get user info
		var res = svc.userInfoService(memberInfo.memberId());
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.SELECT_SUCCESS, "내 정보 조회 성공"));
	}

	/**
	 * 유저 프로필 조회
	 * */
	@GetMapping("/{userId}/profile")
	public ResponseEntity<SuccessResponse<UserAnotherInfoResponseDto>> userProfileController(@PathVariable("userId") Integer userId) {
		log.info("GET /v1/user/{}/profile", userId);
		// get user profile
		var memberProfile = svc.userProfileService(userId);
		return ResponseEntity.ok(new SuccessResponse<>(memberProfile, SuccessCode.SELECT_SUCCESS, "유저 프로필 조회 성공"));
	}


	/**
	 * 프로필 사진 수정
	 * */
	@PutMapping(value = "/profile",  consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SuccessResponse<UserUpdateImgResponseDto>> profileImageController(@Parameter(hidden = true) @RequestHeader("Authorization") String token, @RequestParam(name = "img", required = false)
		MultipartFile profileImg) {
		log.info("PUT /v1/user/profile : token: {}, image: {}", token, profileImg!=null?profileImg.getOriginalFilename():"null");
		// validate token
		var memberInfo = jwt.validateToken(JwtTokenRequestDto.builder().accessToken(token).build());
		// change profile image
		var res = svc.updateUserProfileImgService(memberInfo.memberId(), profileImg);
		return ResponseEntity.ok(new SuccessResponse<>(res, SuccessCode.UPDATE_SUCCESS, "프로필 사진 수정 성공"));
	}


	/**
	 * 닉네임 수정
	 * */
	@PutMapping("/nickname")
	public ResponseEntity<SuccessResponse<UserUpdateNicknameResponseDto>> nicknameController(@Parameter(hidden = true) @RequestHeader("Authorization") String token, @RequestBody UserUpdateNicknameRequestDto nickname) {
		log.info("PUT /v1/user/nickname : token: {}, nickname: {}", token, nickname.nickname());
		// validate token
		var memberInfo = jwt.validateToken(JwtTokenRequestDto.builder().accessToken(token).build());
		// change nickname
		var result = svc.updateUserNicknameService(memberInfo.memberId(), nickname.nickname());
		return ResponseEntity.ok(new SuccessResponse<>(result, SuccessCode.UPDATE_SUCCESS, "닉네임 수정 성공"));
	}


	/**
	 * 기부 뱃지 조회
	 * */
	@GetMapping("/badge")
	public ResponseEntity<SuccessResponse<?>> badgeController(@Parameter(hidden = true) @RequestHeader("Authorization") String token) {
		log.info("GET /v1/user/badge : token: {}", token);
		// validate token
		var memberInfo = jwt.validateToken(JwtTokenRequestDto.builder().accessToken(token).build());
		// get badge
		var result = svc.userBadgeService(memberInfo.memberId());
		return ResponseEntity.ok(new SuccessResponse<>(result, SuccessCode.SELECT_SUCCESS, "기부 뱃지 조회 성공"));
	}
}
