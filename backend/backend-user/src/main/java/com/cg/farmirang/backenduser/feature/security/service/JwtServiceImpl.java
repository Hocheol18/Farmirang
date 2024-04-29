package com.cg.farmirang.backenduser.feature.security.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.cg.farmirang.backenduser.feature.security.dto.request.JwtCreateTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.request.JwtTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtCreateTokenResponseDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtValidateTokenResponseDto;
import com.cg.farmirang.backenduser.feature.security.repository.RedisTokenRepository;

import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService{

	@Value("${spring.jwt.secret}")
	private String secretKey;
	@Value("${spring.jwt.access-token-validity-in-seconds}")
	private int accessTokenValidTime;
	@Value("${spring.jwt.refresh-token-validity-in-seconds}")
	private int refreshTokenValidTime;

	private final RedisTokenRepository redis;

	@Override
	@Transactional
	public JwtCreateTokenResponseDto createToken(JwtCreateTokenRequestDto dto) {
		return null;
	}

	@Override
	public JwtValidateTokenResponseDto validateToken(JwtTokenRequestDto dto) {
		return null;
	}

	@Override
	@Transactional
	public JwtBooleanResponseDto revokeToken(JwtTokenRequestDto dto) {
		return null;
	}

	@Override
	public JwtCreateTokenResponseDto create(JwtCreateTokenRequestDto dto) {
		return null;
	}

	@Override
	public Claims getClaims(JwtTokenRequestDto dto) {
		return null;
	}

	@Override
	public Map<String, Object> getPayload(String token) {
		return Map.of();
	}
}
