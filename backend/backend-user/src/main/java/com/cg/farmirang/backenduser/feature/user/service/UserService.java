package com.cg.farmirang.backenduser.feature.user.service;

import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.backenduser.feature.user.dto.response.UserAnotherInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserIntegerResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserLoginResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserIdResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserStringResponseDto;

public interface UserService {
	UserIdResponseDto registerService(Integer sub);
	UserBooleanResponseDto withdrawService(String accessToken);
	UserLoginResponseDto loginService(Integer sub);
	UserBooleanResponseDto logoutService(Integer memberId);
	UserInfoResponseDto userInfoService(Integer memberId);
	UserStringResponseDto updateUserNicknameService(Integer memberId, String nickname);
	UserStringResponseDto updateUserProfileService(Integer memberId, MultipartFile file);
	UserAnotherInfoResponseDto anotherUserInfoService(Integer anotherMemberId);


}
