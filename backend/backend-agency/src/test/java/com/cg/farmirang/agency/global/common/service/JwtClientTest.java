package com.cg.farmirang.agency.global.common.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JwtClientTest {
	@Autowired
	private JwtClient jwt;

	String token = "";
	String deficeId = "test-device2";

	@Test
	void validateAccessToken() {
		var result = jwt.validateAccessToken(token);
		assertNotNull(result);
		assertNotNull(result.deviceId());
		System.out.println(result);
	}

	@Test
	void validateRefreshToken() {
		var result = jwt.validateRefreshToken(token, deficeId);
		assertNotNull(result);
		assertNull(result.deviceId());
		System.out.println(result);
	}
}