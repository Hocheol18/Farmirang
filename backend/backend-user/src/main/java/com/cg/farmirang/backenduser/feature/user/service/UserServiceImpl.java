package com.cg.farmirang.backenduser.feature.user.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.backenduser.feature.user.dto.response.UserAnotherInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserIdResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserLoginResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserStringResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

	@Override
	public UserIdResponseDto registerService(Integer sub) {
		return null;
	}

	@Override
	public UserBooleanResponseDto withdrawService(String accessToken) {
		return null;
	}

	@Override
	public UserLoginResponseDto loginService(Integer sub) {
		return null;
	}

	@Override
	public UserBooleanResponseDto logoutService(Integer memberId) {
		return null;
	}

	@Override
	public UserInfoResponseDto userInfoService(Integer memberId) {
		return null;
	}

	@Override
	public UserStringResponseDto updateUserNicknameService(Integer memberId, String nickname) {
		return null;
	}

	@Override
	public UserStringResponseDto updateUserProfileService(Integer memberId, MultipartFile file) {
		return null;
	}

	@Override
	public UserAnotherInfoResponseDto anotherUserInfoService(Integer anotherMemberId) {
		return null;
	}
}
