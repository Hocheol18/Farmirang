package com.cg.farmirang.backenduser.feature.user.repository;

import static com.cg.farmirang.backenduser.feature.user.entity.QMember.*;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.backenduser.feature.user.dto.request.AdminUserListServiceRequestDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.AdminUserInfoDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.AdminUserListResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserUpdateImgResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserUpdateNicknameResponseDto;
import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.cg.farmirang.backenduser.feature.user.service.S3Service;
import com.cg.farmirang.backenduser.global.common.code.ErrorCode;
import com.cg.farmirang.backenduser.global.exception.BusinessExceptionHandler;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom {
	@Value("${com.farmirang.user.default_profile}")
	private String defaultProfile;
	@Value("${com.farmirang.user.s3_dir}")
	private String s3Dir;

	private final JPAQueryFactory queryFactory;
	private final S3Service s3;

	public MemberRepositoryCustomImpl(@Qualifier("queryFactory") JPAQueryFactory queryFactory, S3Service s3) {
		this.queryFactory = queryFactory;
		this.s3 = s3;
	}

	@Override
	public void changeAnonymous(Integer memberId) {
		String number = String.valueOf((int)(Math.random() * 99999));
		queryFactory.update(member)
			.set(member.nickname, "anonymous" + number)
			.set(member.profileImg, defaultProfile)
			.set(member.role, MemberRole.ANONYMOUS)
			.where(member.id.eq(memberId))
			.execute();
	}

	@Override
	public UserUpdateNicknameResponseDto updateNickname(Integer memberId, String nickname) {
		var result = queryFactory.update(member)
			.set(member.nickname, nickname)
			.where(member.id.eq(memberId), member.role.ne(MemberRole.ANONYMOUS))
			.execute();
		if(result == 0) {
			log.error("MemberRepositoryCustomImpl updateNickname: 닉네임 변경 실패, memberId : {}", memberId);
			throw new BusinessExceptionHandler("닉네임 변경 실패", ErrorCode.INTERNAL_SERVER_ERROR);
		}
		return queryFactory
			.select(Projections.constructor(
				UserUpdateNicknameResponseDto.class,
				member.nickname
			)).from(member)
			.where(member.id.eq(memberId), member.role.ne(MemberRole.ANONYMOUS))
			.fetchOne();
	}

	@Override
	public UserUpdateImgResponseDto updateProfileImg(Integer memberId, String profileImg) {
		var result = queryFactory.update(member)
			.set(member.profileImg, profileImg)
			.where(member.id.eq(memberId), member.role.ne(MemberRole.ANONYMOUS))
			.execute();
		if(result == 0) {
			log.error("MemberRepositoryCustomImpl updateProfileImg: 프로필 이미지 변경 실패, memberId : {}", memberId);
			String key = profileImg.substring(profileImg.indexOf(s3Dir) + s3Dir.length() + 1);
			s3.delete(key, s3Dir);
			throw new BusinessExceptionHandler("프로필 이미지 변경 실패", ErrorCode.INTERNAL_SERVER_ERROR);
		}
		return queryFactory
			.select(Projections.constructor(
				UserUpdateImgResponseDto.class,
				member.profileImg
			)).from(member)
			.where(member.id.eq(memberId), member.role.ne(MemberRole.ANONYMOUS))
			.fetchOne();
	}

	@Override
	public AdminUserListResponseDto getUserListForAdmin(AdminUserListServiceRequestDto dto) {
		log.debug("MemberRepositoryCustomImpl getUserListForAdmin: start get user list for admin");
		var res = queryFactory.select(Projections.constructor(AdminUserInfoDto.class,
			member.id,
			member.nickname,
			member.profileImg))
			.from(member)
			.offset(dto.cursor())
			.limit(dto.size())
			.orderBy(member.id.asc())
			.fetch();

		var cursor = res.isEmpty() ? dto.cursor() : res.get(res.size() - 1).id();
		return AdminUserListResponseDto.builder()
			.cursor(cursor)
			.members(res)
			.build();
	}

	@Override
	public String getProfileImg(Integer memberId) {
		log.debug("MemberRepositoryCustomImpl getProfileImg: start get profile image, memberId: {}", memberId);
		return queryFactory.select(member.profileImg)
			.from(member)
			.where(member.id.eq(memberId))
			.fetchOne();
	}
}
