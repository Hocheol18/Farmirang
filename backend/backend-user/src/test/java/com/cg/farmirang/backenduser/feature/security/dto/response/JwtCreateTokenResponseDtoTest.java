package com.cg.farmirang.backenduser.feature.security.dto.response;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JwtCreateTokenResponseDtoTest {

	@Test
	void create() {
		var dto = JwtCreateTokenResponseDto.builder()
				.accessToken("accessToken")
				.expiresIn(1)
				.refreshToken("refresh")
				.refreshExpiresIn(2)
				.build();
		assertEquals("accessToken", dto.accessToken());
		assertEquals("Bearer", dto.tokenType());
		System.out.println(dto);
	}

}