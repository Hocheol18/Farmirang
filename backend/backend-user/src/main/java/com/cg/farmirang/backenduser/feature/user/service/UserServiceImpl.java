package com.cg.farmirang.backenduser.feature.user.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.backenduser.feature.user.dto.response.UserAnotherInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoForLoginResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoResponseDto;
import com.cg.farmirang.backenduser.feature.user.dto.response.UserStringResponseDto;
import com.cg.farmirang.backenduser.feature.user.entity.Member;
import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.cg.farmirang.backenduser.feature.user.entity.SocialLogin;
import com.cg.farmirang.backenduser.feature.user.repository.MemberRepository;
import com.cg.farmirang.backenduser.feature.user.repository.SocialLoginRepository;
import com.cg.farmirang.backenduser.global.common.code.ErrorCode;
import com.cg.farmirang.backenduser.global.exception.BusinessExceptionHandler;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

	@Value("${com.farmirang.user.default_profile}")
	private String defaultProfile;

	private final SocialLoginRepository socialRepo;
	private final MemberRepository memberRepo;

	/**
	 * 소셜 로그인 시도 후 없으면 회원가입 처리
	 * TODO: 다양한 계정 연결
	 * */
	@Override
	@Transactional
	public UserInfoForLoginResponseDto registerService(String provider, String sub) {
		var socialLogin = socialRepo.findByProviderAndSub(provider, sub).orElse(null);
		if(socialLogin == null) {
			// start register
			var nickname= randomNickname();
			var member = Member.builder().nickname(nickname).profileImg(defaultProfile).role(MemberRole.MEMBER).build();
			member = memberRepo.save(member);
			socialLogin = socialRepo.save(SocialLogin.builder().member(member).provider(provider).sub(sub).build());
		}
		return UserInfoForLoginResponseDto.builder()
			.memberId(socialLogin.getMember().getId())
			.role(socialLogin.getMember().getRole())
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
		// find member
		var socialLogin = socialRepo.findByMemberId(memberId).orElseThrow(() -> new BusinessExceptionHandler("회원 정보가 없습니다.", ErrorCode.NOT_FOUND_ERROR));
		// delete social login info
		socialRepo.delete(socialLogin);
		// change member to anonymous
		memberRepo.changeAnonymous(memberId);
		// return the result
		return UserBooleanResponseDto.builder().result(true).build();
	}

	@Override
	public UserInfoResponseDto userInfoService(Integer memberId) {
		// find member
		var member = memberRepo.findById(memberId).orElseThrow(() -> new BusinessExceptionHandler("회원 정보가 없습니다.", ErrorCode.NOT_FOUND_ERROR));
		// return the result
		return UserInfoResponseDto.builder()
			.memberId(member.getId())
			.nickname(member.getNickname())
			.profileImg(member.getProfileImg())
			.role(member.getRole())
			.joinDate(member.getJoinDate())
			.badge(member.getBadge())
			.build();
	}

	@Override
	@Transactional
	public UserStringResponseDto updateUserNicknameService(Integer memberId, String nickname) {
		return memberRepo.updateNickname(memberId, nickname);
	}

	@Override
	@Transactional
	public UserStringResponseDto updateUserProfileImgService(Integer memberId, MultipartFile file) {
		// check profile whether it is default or not

		// upload image to s3
		String url = null;
		// update profile image
		return memberRepo.updateProfileImg(memberId, url);
	}

	@Override
	public UserAnotherInfoResponseDto userProfileService(Integer anotherMemberId) {
		var member = memberRepo.findById(anotherMemberId).orElseThrow(() -> new BusinessExceptionHandler("회원 정보가 없습니다.", ErrorCode.NOT_FOUND_ERROR));
		return UserAnotherInfoResponseDto.builder()
			.badge(member.getBadge())
			.nickname(member.getNickname())
			.profileImg(member.getProfileImg())
			.role(member.getRole())
			.build();
	}
}
