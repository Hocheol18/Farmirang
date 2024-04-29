package com.cg.farmirang.backenduser.feature.security.entity;

import org.springframework.data.redis.core.RedisHash;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "jwt", timeToLive = (60L * 60L * 24L * 7L))
public class RedisTokenEntity {
	@Id
	private String id;    // device_id
	private int memberId;    // member_id
	private String refreshToken;

}
