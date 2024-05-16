package com.cg.farmirang.backenduser.feature.user.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.backenduser.feature.donation.repository.DonorRepository;
import com.cg.farmirang.backenduser.feature.user.dto.request.AdminUserListServiceRequestDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.AdminUserDetailResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.AdminUserIdResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.AdminUserListResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserAnotherInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoForLoginResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserIntegerResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserUpdateImgResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserUpdateNicknameResponseDto;
import com.cg.farmirang.backenduser.feature.user.entity.Member;
import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.cg.farmirang.backenduser.feature.user.entity.SocialLogin;
import com.cg.farmirang.backenduser.feature.user.repository.MemberRepository;
import com.cg.farmirang.backenduser.feature.user.repository.SocialLoginRepository;
import com.cg.farmirang.backenduser.global.common.code.ErrorCode;
import com.cg.farmirang.backenduser.global.exception.BusinessExceptionHandler;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

	@Value("${com.farmirang.user.default_profile}")
	private String defaultProfile;
	@Value("${com.farmirang.user.s3_url}")
	private String s3Url;
	@Value("${com.farmirang.user.s3_dir}")
	private String s3Dir;

	private final SocialLoginRepository socialRepo;
	private final MemberRepository memberRepo;
	private final DonorRepository donorRepo;
	private final S3Service s3;

	/**
	 * 소셜 로그인 시도 후 없으면 회원가입 처리
	 * TODO: 다양한 계정 연결
	 * */
	@Override
	@Transactional
	public UserInfoForLoginResponseDto registerService(String provider, String sub) {
		var socialLogin = socialRepo.findByProviderAndSub(provider, sub).orElse(null);
		log.debug("UserService registerService: find social_login");
		if(socialLogin == null) {
			// start register
			log.debug("UserService registerService: start registration");
			var nickname= randomNickname();
			var member = Member.builder().nickname(nickname).profileImg(defaultProfile).role(MemberRole.MEMBER).build();
			member = memberRepo.save(member);
			log.debug("UserService registerService: save member, member_id: {}", member.getId());
			socialLogin = socialRepo.save(SocialLogin.builder().member(member).provider(provider).sub(sub).build());
		}
		log.debug("UserService registerService: social_login: {}", socialLogin.getId());
		return UserInfoForLoginResponseDto.builder()
			.memberId(socialLogin.getMember().getId())
			.role(socialLogin.getMember().getRole())
			.nickname(socialLogin.getMember().getNickname())
			.profileImg(socialLogin.getMember().getProfileImg())
			.build();
	}

	private String randomNickname() {
		List<String> prefix = Arrays.asList("성실한", "열정적인", "행복한", "평화로운", "자유로운", "창의적인", "활발한", "유쾌한", "친절한", "용감한", "신중한", "정직한", "근면한", "겸손한", "헌신적인", "희망찬", "진취적인", "지혜로운", "신비로운",
			"빛나는", "끝내주는", "우아한", "멋진", "아름다운", "찬란한", "훌륭한", "탁월한", "인상적인", "진정한", "따뜻한", "기특한", "능력있는", "자랑스러운", "감동적인", "흥겨운", "참된", "명확한", "화려한", "단호한");
		List<String> name = Arrays.asList("부추", "상추", "고추", "고구마", "감자", "참외", "오이", "당근", "방울토마토", "옥수수", "땅콩", "양파", "블루베리", "열무", "딸기", "생강");
		String number = String.valueOf((int)(Math.random() * 99));
		Collections.shuffle(prefix);
		Collections.shuffle(name);
		return prefix.get(0) + " " + name.get(0) + number;
	}

	@Override
	@Transactional
	public UserBooleanResponseDto withdrawService(Integer memberId) {
		log.debug("UserService withdrawService: member id: {}", memberId);
		// delete social login info
		socialRepo.deleteByMemberId(memberId);
		// delete profile image
		String filename = memberRepo.getProfileImg(memberId);
		if(!filename.contains("default.png")) {
			String key = filename.substring(filename.indexOf(s3Dir) + s3Dir.length() + 1);
			if (s3.delete(key, s3Dir) >= 400) {
				log.error("UserService withdrawService: 이미지 삭제 중 오류가 발생했습니다, memberId : {}, profileImage: {}", memberId, key);
			}
			log.debug("UserService withdrawService: delete profile image");
		}
		// change member to anonymous
		memberRepo.changeAnonymous(memberId);
		log.debug("UserService withdrawService: change member to anonymous, member_id: {}", memberId);
		// return the result
		return UserBooleanResponseDto.builder().result(true).build();
	}

	@Override
	public UserInfoResponseDto userInfoService(Integer memberId) {
		// find member
		var member = memberRepo.findByIdAndRoleNot(memberId, MemberRole.ANONYMOUS).orElseThrow(() -> new BusinessExceptionHandler("회원 정보가 없습니다.", ErrorCode.NOT_FOUND_ERROR));
		log.debug("UserService userInfoService: find member, member_id: {}", member.getId());
		var badge = donorRepo.countDonorByMemberIdAndApproval(memberId, true);
		// return the result
		return UserInfoResponseDto.builder()
			.memberId(member.getId())
			.nickname(member.getNickname())
			.profileImg(member.getProfileImg())
			.role(member.getRole())
			.joinDate(member.getJoinDate())
			.badge(badge)
			.build();
	}

	@Override
	@Transactional
	public UserUpdateNicknameResponseDto updateUserNicknameService(Integer memberId, String nickname) {
		log.debug("UserService updateUserNicknameService: start update nickname, member_id: {}", memberId);
		return memberRepo.updateNickname(memberId, nickname);
	}

	@Override
	@Transactional
	public UserUpdateImgResponseDto updateUserProfileImgService(Integer memberId, MultipartFile file) {
		// find member
		var member = memberRepo.findByIdAndRoleNot(memberId, MemberRole.ANONYMOUS).orElseThrow(() -> new BusinessExceptionHandler("회원 정보가 없습니다.", ErrorCode.NOT_FOUND_ERROR));
		log.debug("UserService updateUserProfileImgService: find member, member_id: {}", member.getId());
		// check profile whether it is default or not
		if(!member.getProfileImg().contains("default.png")) {
			// delete previous image
			String filename = member.getProfileImg();
			String key = filename.substring(filename.indexOf(s3Dir) + s3Dir.length() + 1);
			if (s3.delete(key, s3Dir) >= 400) {
				log.error("UserService updateUserProfileImgService: 이미지 삭제 중 오류가 발생했습니다, memberId : {}, profileImage: {}", memberId, key);
				throw new BusinessExceptionHandler("이미지 삭제 중 오류가 발생했습니다", ErrorCode.S3_DELETE_ERROR);
			}
		}
		// upload image to s3
		String url = defaultProfile;
		if(file != null) {
			String uuid = UUID.randomUUID().toString();
			String key = s3.upload(file, s3Dir, uuid);
			url = s3Url+"/"+key;
			log.debug("UserService updateUserProfileImgService: upload image to s3, image key: {}", key);
		}
		// update profile image
		return memberRepo.updateProfileImg(memberId, url);
	}

	@Override
	public UserAnotherInfoResponseDto userProfileService(Integer anotherMemberId) {
		var member = memberRepo.findByIdAndRoleNot(anotherMemberId, MemberRole.ANONYMOUS).orElseThrow(() -> new BusinessExceptionHandler("회원 정보가 없습니다.", ErrorCode.NOT_FOUND_ERROR));
		log.debug("UserService userProfileService: find member, member_id: {}", member.getId());
		var badge = donorRepo.countDonorByMemberIdAndApproval(anotherMemberId, true);
		return UserAnotherInfoResponseDto.builder()
			.badge(badge)
			.nickname(member.getNickname())
			.profileImg(member.getProfileImg())
			.role(member.getRole())
			.build();
	}

	@Override
	public UserIntegerResponseDto userBadgeService(Integer memberId) {
		log.debug("UserService userBadgeService: start find badge, member_id: {}", memberId);
		var res = donorRepo.countDonorByMemberIdAndApproval(memberId, true);

		return UserIntegerResponseDto.builder().result(res).build();
	}

	@Override
	public AdminUserListResponseDto adminUserListService(AdminUserListServiceRequestDto dto) {
		log.debug("UserService adminUserListService: start find list, cursor: {}, size: {}", dto.cursor(), dto.size());
		return memberRepo.getUserListForAdmin(dto);
	}

	@Override
	public AdminUserDetailResponseDto adminUserDetailService(Integer memberId) {
		log.debug("UserService adminUserDetailService: start find detail, member_id: {}", memberId);
		// get member info
		var member = memberRepo.findByIdAndRoleNot(memberId, MemberRole.ANONYMOUS).orElseThrow(() -> new BusinessExceptionHandler("회원 정보가 없습니다.", ErrorCode.NOT_FOUND_ERROR));
		// get social login info
		var socialLogins = socialRepo.getSocialLoginInfoList(memberId);
		// get badge info
		var badge = donorRepo.countDonorByMemberIdAndApproval(memberId, true);
		// return
		return AdminUserDetailResponseDto.builder()
			.id(member.getId())
			.nickname(member.getNickname())
			.profileImg(member.getProfileImg())
			.role(member.getRole())
			.joinDate(member.getJoinDate())
			.badge(badge)
			.socialLogins(socialLogins)
			.build();
	}

	@Override
	@Transactional
	public AdminUserIdResponseDto adminUserWithdrawService(Integer memberId) {
		log.debug("UserService adminUserWithdrawService: start withdrawal, member_id: {}", memberId);
		withdrawService(memberId);
		return AdminUserIdResponseDto.builder().id(memberId).build();
	}
}
