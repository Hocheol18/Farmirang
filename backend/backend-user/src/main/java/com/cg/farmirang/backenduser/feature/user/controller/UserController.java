package com.cg.farmirang.backenduser.feature.user.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.farmirang.backenduser.feature.security.repository.RedisTokenRepository;
import com.cg.farmirang.backenduser.feature.security.service.JwtService;
import com.cg.farmirang.backenduser.feature.user.repository.MemberRepository;
import com.cg.farmirang.backenduser.feature.user.repository.SocialLoginRepository;
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
	private final MemberRepository member;
	private final SocialLoginRepository social;



	/**
	 * 회원 탈퇴
	 * */

	/**
	 * 내 정보 조회
	 * */


	/**
	 * 유저 프로필 조회
	 * */


	/**
	 * 프로필 사진 수정
	 * */


	/**
	 * 닉네임 수정
	 * */


	/**
	 * 기부 뱃지 조회
	 * */
}
