package com.cg.farmirang.backenduser.feature.security.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.cg.farmirang.backenduser.feature.security.dto.request.JwtCreateTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.request.JwtTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.repository.RedisTokenRepository;
import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class JwtServiceImplTest {
	@Autowired
	JwtService svc;
	@Autowired
	RedisTokenRepository redis;

	String accessToken = "Bearer testtest";
	String refreshToken = "test";
	int memberId = 8;
	String deviceId = "test-device";

	@Order(1)
	@Test
	void createToken() {
		var entity = JwtCreateTokenRequestDto.builder()
			.memberId(memberId)
			.role(MemberRole.MEMBER)
			.deviceId(deviceId)
			.build();
		var res = svc.createToken(entity);
		var target = redis.findById(entity.deviceId()).orElse(null);
		assertNotNull(res);
		assertNotNull(target);
		assertEquals(res.refreshToken(), target.getRefreshToken());
		assertNotNull(res.accessToken());
		System.out.println(res);
		accessToken = "Bearer " + res.accessToken();
		refreshToken = res.refreshToken();
	}

	@Order(2)
	@Test
	void validateToken() {
		var access = JwtTokenRequestDto.builder().accessToken(accessToken).deviceId(deviceId).build();
		var refresh = JwtTokenRequestDto.builder().refreshToken(refreshToken).deviceId(deviceId).build();

		var accessResult = svc.validateToken(access);
		var refreshResult = svc.validateToken(refresh);
		assertNotNull(accessResult);
		assertNotNull(refreshResult);
		assertEquals(accessResult.memberId(), memberId);
		System.out.println(accessResult);
	}

	@Order(3)
	@Test
	void reissueToken() {
		var args = JwtTokenRequestDto.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.deviceId(deviceId)
			.build();
		var entity = svc.reissueToken(args);
		var res = redis.findById(deviceId).orElse(null);
		assertNotNull(entity);
		assertNotNull(res);
		assertEquals(entity.refreshToken(), res.getRefreshToken());
		assertEquals("Bearer", entity.tokenType());
		System.out.println(entity);
		accessToken = "Bearer " + entity.accessToken();
		refreshToken = entity.refreshToken();
	}

	@Order(4)
	@Test
	void revokeToken() {
		var args = JwtTokenRequestDto.builder().accessToken(accessToken).deviceId(deviceId).build();
		var entity = svc.revokeToken(args);
		var res = redis.findById(deviceId).orElse(null);
		assertNotNull(entity);
		assertNull(res);
		assertTrue(entity.result());

	}
}