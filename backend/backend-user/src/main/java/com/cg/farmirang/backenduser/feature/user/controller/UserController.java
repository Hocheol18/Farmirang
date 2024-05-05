package com.cg.farmirang.backenduser.feature.user.controller;


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

import com.cg.farmirang.backenduser.feature.security.service.JwtService;
import com.cg.farmirang.backenduser.feature.user.service.UserService;
import com.cg.farmirang.backenduser.global.common.response.SuccessResponse;

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
	@DeleteMapping("/")
	public ResponseEntity<SuccessResponse<?>> withdrawalController(@RequestHeader("Authorization") String token, @CookieValue("Device-id") String deviceId) {
		// change user to anonymous

		// delete refresh token
		return null;
	}

	/**
	 * 내 정보 조회
	 * */
	@GetMapping("/userinfo")
	public ResponseEntity<SuccessResponse<?>> userInfoController(@RequestHeader("Authorization") String token) {
		return null;
	}

	/**
	 * 유저 프로필 조회
	 * */
	@GetMapping("/{userId}/profile")
	public ResponseEntity<SuccessResponse<?>> userProfileController(@PathVariable("userId") Integer userId) {
		return null;
	}


	/**
	 * 프로필 사진 수정
	 * */
	@PutMapping("/profile")
	public ResponseEntity<SuccessResponse<?>> profileImageController(@RequestHeader("Authorization") String token, @RequestParam("img")
		MultipartFile profileImg) {
		return null;
	}


	/**
	 * 닉네임 수정
	 * */
	@PutMapping("/nickname")
	public ResponseEntity<SuccessResponse<?>> nicknameController(@RequestHeader("Authorization") String token, @RequestBody String nickname) {
		return null;
	}


	/**
	 * 기부 뱃지 조회
	 * */
	@GetMapping("/badge")
	public ResponseEntity<SuccessResponse<?>> badgeController(@RequestHeader("Authorization") String token) {
		return null;
	}
}
