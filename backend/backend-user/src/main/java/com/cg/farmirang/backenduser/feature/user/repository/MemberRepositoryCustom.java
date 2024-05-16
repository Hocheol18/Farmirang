package com.cg.farmirang.backenduser.feature.user.repository;

import com.cg.farmirang.backenduser.feature.user.dto.request.AdminUserListServiceRequestDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.AdminUserListResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserUpdateImgResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserUpdateNicknameResponseDto;

public interface MemberRepositoryCustom {
	void changeAnonymous(Integer memberId);
	UserUpdateNicknameResponseDto updateNickname(Integer memberId, String nickname);
	UserUpdateImgResponseDto updateProfileImg(Integer memberId, String profileImg);
	AdminUserListResponseDto getUserListForAdmin(AdminUserListServiceRequestDto dto);
	String getProfileImg(Integer memberId);
}
