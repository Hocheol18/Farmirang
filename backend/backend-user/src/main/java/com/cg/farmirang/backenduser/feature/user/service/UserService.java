package com.cg.farmirang.backenduser.feature.user.service;

import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.backenduser.feature.user.dto.response.UserAnotherInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoForLoginResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserStringResponseDto;

public interface UserService {
	UserInfoForLoginResponseDto registerService(String provider, String sub);
	UserBooleanResponseDto withdrawService(Integer memberId);
	UserInfoResponseDto userInfoService(Integer memberId);
	UserStringResponseDto updateUserNicknameService(Integer memberId, String nickname);
	UserStringResponseDto updateUserProfileImgService(Integer memberId, MultipartFile file);
	UserAnotherInfoResponseDto userProfileService(Integer anotherMemberId);


}
