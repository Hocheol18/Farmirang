package com.cg.farmirang.backenduser.feature.user.repository;

import com.cg.farmirang.backenduser.feature.user.dto.response.UserStringResponseDto;

public interface MemberRepositoryCustom {
	void changeAnonymous(Integer memberId);
	UserStringResponseDto updateNickname(Integer memberId, String nickname);
	UserStringResponseDto updateProfileImg(Integer memberId, String profileImg);
}
