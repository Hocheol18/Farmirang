package com.cg.farmirang.backenduser.feature.user.service;

import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.backenduser.feature.user.dto.request.AdminUserListServiceRequestDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.AdminUserDetailResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.AdminUserIdResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.AdminUserListResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserAnotherInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoForLoginResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserIntegerResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserUpdateImgResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserUpdateNicknameResponseDto;

public interface UserService {
	UserInfoForLoginResponseDto registerService(String provider, String sub);
	UserBooleanResponseDto withdrawService(Integer memberId);
	UserInfoResponseDto userInfoService(Integer memberId);
	UserUpdateNicknameResponseDto updateUserNicknameService(Integer memberId, String nickname);
	UserUpdateImgResponseDto updateUserProfileImgService(Integer memberId, MultipartFile file);
	UserAnotherInfoResponseDto userProfileService(Integer anotherMemberId);
	UserIntegerResponseDto userBadgeService(Integer memberId);
	AdminUserListResponseDto adminUserListService(AdminUserListServiceRequestDto dto);
	AdminUserDetailResponseDto adminUserDetailService(Integer memberId);
	AdminUserIdResponseDto adminUserWithdrawService(Integer memberId);

}
