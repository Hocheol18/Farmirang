package com.cg.farmirang.backenduser.feature.security.service;

import java.util.Map;

import com.cg.farmirang.backenduser.feature.security.dto.request.JwtCreateTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.request.JwtTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtCreateTokenResponseDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtValidateTokenResponseDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

public interface JwtService {
	JwtCreateTokenResponseDto createToken(JwtCreateTokenRequestDto dto);
	JwtValidateTokenResponseDto validateToken(JwtTokenRequestDto dto);
	JwtBooleanResponseDto revokeToken(JwtTokenRequestDto dto);
	JwtCreateTokenResponseDto reissueToken(JwtTokenRequestDto dto);
	JwtCreateTokenResponseDto create(JwtCreateTokenRequestDto dto);
	Claims getClaims(String token, String key) throws ExpiredJwtException;
}
