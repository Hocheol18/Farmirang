package com.cg.farmirang.backenduser.feature.security.service;

import java.util.Date;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cg.farmirang.backenduser.feature.security.dto.request.JwtCreateTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.request.JwtTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.request.ParseAccessTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.request.ParseRefreshTokenRequestDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtBooleanResponseDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtCreateTokenResponseDto;
import com.cg.farmirang.backenduser.feature.security.dto.response.JwtValidateTokenResponseDto;
import com.cg.farmirang.backenduser.feature.security.entity.RedisTokenEntity;
import com.cg.farmirang.backenduser.feature.security.repository.RedisTokenRepository;
import com.cg.farmirang.backenduser.feature.user.entity.MemberRole;
import com.cg.farmirang.backenduser.feature.user.repository.RedisRoleRepository;
import com.cg.farmirang.backenduser.global.common.code.ErrorCode;
import com.cg.farmirang.backenduser.global.exception.BusinessExceptionHandler;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.GsonBuilder;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.RequiredTypeException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
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
	private final RedisRoleRepository roleRedis;


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
		var entity = RedisTokenEntity.builder()
			.id(dto.deviceId())
			.memberId(dto.memberId())
			.refreshToken(token.refreshToken())
			.build();
		// redis에 저장
		redis.save(entity);
		// 반환
		return token;
	}

	/**
	 * 토큰 확인
	 * 액세스 토큰인 경우 키로 파싱, 리프레시 토큰인 경우 device-id로 redis에서 탐색
	 * @param dto 토큰 확인 요청 정보(액세스 토큰 or 리프레시 토큰, 기기 구분 번호)
	 * @return 액세스 토큰인 경우 토큰 정보(사용자 ID, 닉네임, 권한, 기기 구분 번호)
	 *             리프레시 토큰인 경우 빈 객체
	 *             토큰이 유효하지 않은 경우 null
	 * */
	@Override
	public JwtValidateTokenResponseDto validateToken(JwtTokenRequestDto dto) {
		var accessToken = dto.accessToken();
		if(!Objects.isNull(accessToken)) {
			var split = accessToken.split(" ");
			if(split.length != 2 || !split[0].equalsIgnoreCase("bearer")) {
				throw new BusinessExceptionHandler("지원하지 않는 토큰 형식입니다.", ErrorCode.UNSUPPORTED_TOKEN_ERROR);
			}
			return validateAccessToken(split[1]);
		}
		// 액세스 토큰이 없는 경우 리프레시 토큰 검증
		var refreshToken = dto.refreshToken();
		var deviceId = parseClaims(refreshToken, ParseRefreshTokenRequestDto.class).deviceId();
		log.debug("JWT-Service-validateToken-parse: {}", parseClaims(refreshToken, ParseRefreshTokenRequestDto.class));
		log.debug("JWT-Service-validateToken-device_id: {}", deviceId);
		if(Objects.isNull(deviceId)) {
			log.error("JWT-Service-validateToken-NullTokenError");
			throw new BusinessExceptionHandler("요청한 값이 없습니다", ErrorCode.MISSING_REQUEST_PARAMETER_ERROR);
		}
		var result =  validateRefreshToken(refreshToken, deviceId);
		if(result == null) {
			log.error("JWT-Service-validateToken-VaildationError");
			throw new BusinessExceptionHandler("토큰이 유효하지 않습니다", ErrorCode.WRONG_TOKEN_ERROR);
		}
		return result;
	}

	/**
	 * 토큰 폐기
	 * @param dto 폐기할 토큰 정보(액세스 토큰, 리프레시 토큰, 기기 구분 번호)
	 * @return 폐기 성공 여부
	 * */
	@Override
	@Transactional
	public JwtBooleanResponseDto revokeToken(JwtTokenRequestDto dto) {
		String deviceId = null;
		if(dto.accessToken() == null || dto.accessToken().isBlank()){
			if(dto.refreshToken() == null || dto.refreshToken().isBlank()) throw new BusinessExceptionHandler("토큰이 없습니다", ErrorCode.MISSING_REQUEST_PARAMETER_ERROR);
			deviceId = parseClaims(dto.refreshToken(), ParseRefreshTokenRequestDto.class).deviceId();
		} else {
			deviceId = parseClaims(dto.accessToken(), ParseAccessTokenRequestDto.class).deviceId();
		}
		validateToken(dto);
		redis.deleteById(deviceId);
		return JwtBooleanResponseDto.builder().result(true).build();
	}

	@Override
	public JwtBooleanResponseDto revokeAllByMemberId(Integer memberId) {
		redis.deleteAllByMemberId(memberId);
		return JwtBooleanResponseDto.builder().result(true).build();

	}

	/**
	 * 토큰 갱신
	 * @param dto 갱신할 토큰 정보(액세스 토큰, 리프레시 토큰, 기기 구분 번호)
	 * @return 갱신된 토큰 정보(accessToken, refreshToken, 만료시간, refresh 만료시간)
	 * */
	@Override
	@Transactional
	public JwtCreateTokenResponseDto reissueToken(JwtTokenRequestDto dto) {
		// validate token
		var accessDto = JwtTokenRequestDto.builder().accessToken(dto.accessToken()).build();
		var deviceId = parseClaims(dto.refreshToken(), ParseRefreshTokenRequestDto.class).deviceId();
		var refreshDto = JwtTokenRequestDto.builder().refreshToken(dto.refreshToken()).deviceId(deviceId).build();
		validateToken(accessDto);
		validateToken(refreshDto);
		// parsing token to get member info
		Claims claims = null;
		try {
			var accessToken = dto.accessToken().split(" ")[1];
			claims = getClaims(accessToken, secretKey);
		} catch (ExpiredJwtException e) {
			claims = e.getClaims();
		} catch (Exception e) {
			log.error("JWT-Service-reissueToken-Exception", e);
			throw new BusinessExceptionHandler("토큰이 유효하지 않습니다", ErrorCode.WRONG_TOKEN_ERROR);
		}
		// get role from redis
		var role = roleRedis.findById(claims.get("id", Double.class).intValue()).orElse(null);
		log.debug("JWT-Service-reissueToken-role-cache: {}", role);
		// create new token
		var token = create(JwtCreateTokenRequestDto.builder()
			.memberId(claims.get("id", Double.class).intValue())
			.role(role==null?MemberRole.valueOf(claims.get("role", String.class)) : role.getRole())
			.deviceId(claims.get("device_id", String.class))
			.build());
		// update redis
		var entity = redis.findById(deviceId).orElse(null);
		try {
			entity.setRefreshToken(token.refreshToken());
			redis.save(entity);
		} catch (NullPointerException e) {
			log.error("JWT-Service-reissueToken-NullPointerException", e);
			throw new BusinessExceptionHandler("토큰 저장 오류", ErrorCode.INTERNAL_SERVER_ERROR);
		}
		return token;
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

	@Override
	public <T> T parseClaims(String token, Class<T> classOfT) {
		var split = token.split("\\.");
		if(split.length != 3) throw new BusinessExceptionHandler("지원하지 않는 토큰 형식입니다.", ErrorCode.UNSUPPORTED_TOKEN_ERROR);
		var payload = split[1];
		var decoded = new String(java.util.Base64.getDecoder().decode(payload));
		var gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES).create();
		return gson.fromJson(decoded, classOfT);
	}

	@Override
	public JwtValidateTokenResponseDto validateAccessToken(String accessToken) {
		Claims claims = null;
		try {
			// 액세스 토큰 파싱
			claims = getClaims(accessToken, secretKey);
			return JwtValidateTokenResponseDto.builder()
				.memberId(claims.get("id", Double.class).intValue())
				.role(MemberRole.valueOf(claims.get("role", String.class)))
				.deviceId(claims.get("device_id", String.class))
				.build();
		} catch (ExpiredJwtException e) {
			log.error("JWT-Service-validateAccessToken-ExpiredJwtException", e);
			throw new BusinessExceptionHandler("토큰이 만료되었습니다", ErrorCode.EXPIRED_TOKEN_ERROR);
		} catch (Exception e) {
			log.error("JWT-Service-validateAccessToken-Exception", e);
			throw new BusinessExceptionHandler("적절하지 않은 토큰입니다", ErrorCode.WRONG_TOKEN_ERROR);
		}
	}

	@Override
	public JwtValidateTokenResponseDto validateRefreshToken(String refreshToken, String deviceId) {
		var result = redis.findById(deviceId).orElse(null);
		if(result == null) {
			log.error("JWT-Service-validateRefreshToken-RefreshTokenNotFoundError");
			return null;
		}
		// 리프레시 토큰이 레디스에 있다면 빈 객체 반환
		else if(result.getRefreshToken().equals(refreshToken)) return JwtValidateTokenResponseDto.builder().build();

		log.error("JWT-Service-validateRefreshToken-RefreshTokenNotEqualError");
		return null;
	}

}
