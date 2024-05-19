package com.cg.farmirang.backenduser.feature.user.service;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;

@SpringBootTest
class UserServiceImplTest {
	@Autowired
	private UserService svc;

	Integer memberId = 3;
	String dir = "farmirang/profile";
	String filePath = "discord.png";


	@Test
	void withdrawService() {
		var result = svc.withdrawService(memberId);
		assertNotNull(result);
		assertEquals(result.result(), true);
	}

	@Test
	void userInfoService() {
		var result = svc.userInfoService(memberId);
		System.out.println(result);
		assertNotNull(result);
		assertEquals(result.memberId(), 3);
	}

	@Test
	void updateUserNicknameService() {
		String nickname = "test";
		var result = svc.updateUserNicknameService(memberId, nickname);
		assertNotNull(result);
		assertEquals(result.nickname(), nickname);
	}

	@Test
	void updateUserProfileImgService() throws IOException {
		var file = new File(filePath);
		MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(), "image/png", new FileInputStream(file));
		var result = svc.updateUserProfileImgService(memberId, multipartFile);
		assertNotNull(result);
		assertTrue(result.url().contains("farmirang/profile"));
		assertTrue(result.url().contains("discord"));
		assertTrue(result.url().contains("amazonaws"));
	}

	@Test
	void userProfileService() {
		var result = svc.userProfileService(memberId);
		assertNotNull(result);
		assertEquals(result.role(), MemberRole.MEMBER);
		assertTrue(result.profileImg().contains("farmirang/profile"));
		assertFalse(result.profileImg().contains("default"));
		assertEquals(result.nickname(), "test");
	}
}