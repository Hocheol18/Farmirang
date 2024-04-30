package com.cg.farmirang.backenduser.feature.security.service;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.cg.farmirang.backenduser.feature.security.dto.request.JwtCreateTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.request.JwtTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtCreateTokenResponseDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtValidateTokenResponseDto;
import com.cg.farmirang.backenduser.feature.security.repository.RedisTokenRepository;
import com.cg.farmirang.backenduser.global.common.code.ErrorCode;
import com.cg.farmirang.backenduser.global.exception.BusinessExceptionHandler;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.RequiredTypeException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtServiceImpl implements JwtService{

	@Value("${spring.jwt.secret}")
	private String secretKey;
	@Value("${spring.jwt.access-token-validity-in-seconds}")
	private int accessTokenValidTime;
	@Value("${spring.jwt.refresh-token-validity-in-seconds}")
	private int refreshTokenValidTime;

	private final RedisTokenRepository redis;


	/**
	 * 토큰 생성 후 반환 및 redis에 저장
	 * @param dto 토큰 생성 요청 정보(사용자 ID, 닉네임, 권한, 기기 구분 번호)
	 * @return 토큰 생성 응답 정보(accessToken, refreshToken, 만료시간, refresh 만료시간)
	 * */
	@Override
	@Transactional
	public JwtCreateTokenResponseDto createToken(JwtCreateTokenRequestDto dto) {
		// 토큰 생성
		var token = create(dto);
		// redis entity 생성

		// redis에 저장

		// 반환
		return null;
	}

	/**
	 * 토큰 확인
	 * 액세스 토큰인 경우 키로 파싱, 리프레시 토큰인 경우 device-id로 redis에서 탐색
	 * @param dto 토큰 확인 요청 정보(액세스 토큰, 리프레시 토큰, 기기 구분 번호)
	 * @return 액세스 토큰인 경우 토큰 정보(사용자 ID, 닉네임, 권한, 기기 구분 번호)
	 *             리프레시 토큰인 경우 빈 객체
	 *             토큰이 유효하지 않은 경우 null
	 * */
	@Override
	public JwtValidateTokenResponseDto validateToken(JwtTokenRequestDto dto) {
		return null;
	}

	/**
	 * 토큰 폐기
	 * @param dto 폐기할 토큰 정보(액세스 토큰, 리프레시 토큰, 기기 구분 번호)
	 * @return 폐기 성공 여부
	 * */
	@Override
	@Transactional
	public JwtBooleanResponseDto revokeToken(JwtTokenRequestDto dto) {
		return null;
	}

	/**
	 * 토큰 갱신
	 * @param dto 갱신할 토큰 정보(액세스 토큰, 리프레시 토큰, 기기 구분 번호)
	 * @return 갱신된 토큰 정보(accessToken, refreshToken, 만료시간, refresh 만료시간)
	 * */
	@Override
	public JwtCreateTokenResponseDto reissueToken(JwtTokenRequestDto dto) {
		return null;
	}


	/**
	 * 토큰 발급 메소드
	 * @param dto 토큰 발급 요청 정보(사용자 ID, 닉네임, 권한, 기기 구분 번호)
	 * @return 토큰 발급 응답 정보(accessToken, refreshToken, 만료시간, refresh 만료시간)
	 * */
	@Override
	public JwtCreateTokenResponseDto create(JwtCreateTokenRequestDto dto) {
		// 유효기간 계산을 위한 현재시간
		long now = System.currentTimeMillis();
		// 해싱 키 생성
		var accessKey = Keys.hmacShaKeyFor(secretKey.getBytes());
		var refreshKey = Jwts.SIG.HS512.key().build();
		// JWT 생성
		String accessToken = Jwts.builder()
			.header()
			.add("typ", "JWT")
			.and()
			.subject("access-token")
			.expiration(new Date(now + 1000L * accessTokenValidTime))
			.claim("id", dto.memberId())
			.claim("nickname", dto.nickname())
			.claim("role", dto.role().name())
			.claim("device_id", dto.deviceId())
			.signWith(accessKey, Jwts.SIG.HS512)
			.compact();
		String refreshToken = Jwts.builder()
			.header()
			.add("typ", "JWT")
			.and()
			.subject("refresh-token")
			.expiration(new Date(now + 1000L * refreshTokenValidTime))
			.claim("id", dto.memberId())
			.claim("device_id", dto.deviceId())
			.signWith(refreshKey)
			.compact();
		// 반환
		return JwtCreateTokenResponseDto.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.expiresIn(accessTokenValidTime)
			.refreshExpiresIn(refreshTokenValidTime)
			.build();
	}

	/**
	 * 토큰 파싱해서 payload를 Claims 객체로 반환
	 * @param token 토큰
	 * @param key 토큰 해싱에 사용된 키
	 * @return 토큰 payload
	 * */
	@Override
	public Claims getClaims(String token, String key) {
		// key 생성
		var secret = Keys.hmacShaKeyFor(key.getBytes());
		// parser 생성
		var parser = Jwts.parser().verifyWith(secret).build();
		try {
			// 서명된 토큰 파싱
			var jwt = parser.parseSignedClaims(token);
			// claims 반환
			return jwt.getPayload();
		}
		// ExpiredJwtException, Exception은 상위로 올려보내서 처리해야 함(메소드마다 처리 방식이 달라짐)
		catch (MalformedJwtException | SecurityException e) {
			log.error("JWT-Service-getClaims-MalformedJwtException", e);
			throw new BusinessExceptionHandler("토큰 형식이 맞지 않습니다", ErrorCode.SECURITY_TOKEN_ERROR);
		} catch (UnsupportedJwtException e) {
			log.error("JWT-Service-getClaims-UnsupportedJwtException", e);
			throw new BusinessExceptionHandler("지원하지 않는 토큰 형식입니다", ErrorCode.UNSUPPORTED_TOKEN_ERROR);
		} catch (RequiredTypeException e) {
			log.error("JWT-Service-getClaims-RequiredTypeException", e);
			throw new BusinessExceptionHandler("토큰 변환에 실패했습니다.", ErrorCode.INTERNAL_SERVER_ERROR);
		}
	}
}
