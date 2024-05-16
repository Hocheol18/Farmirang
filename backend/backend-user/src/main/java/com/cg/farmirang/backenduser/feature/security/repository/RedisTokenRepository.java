package com.cg.farmirang.backenduser.feature.security.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.backenduser.feature.security.entity.RedisTokenEntity;

@Repository
public interface RedisTokenRepository extends CrudRepository<RedisTokenEntity, String> {
	void deleteAllByMemberId(Integer memberId);
}
