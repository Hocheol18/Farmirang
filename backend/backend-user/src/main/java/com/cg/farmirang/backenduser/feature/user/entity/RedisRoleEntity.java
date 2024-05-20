package com.cg.farmirang.backenduser.feature.user.entity;

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
@RedisHash(value = "role", timeToLive = (60L * 60L * 24L * 7L))
public class RedisRoleEntity {
	@Id
	Integer id;
	MemberRole role;
}
