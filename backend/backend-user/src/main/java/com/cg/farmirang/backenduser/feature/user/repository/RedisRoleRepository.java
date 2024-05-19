package com.cg.farmirang.backenduser.feature.user.repository;

import org.springframework.data.repository.CrudRepository;

import com.cg.farmirang.backenduser.feature.user.entity.RedisRoleEntity;

public interface RedisRoleRepository extends CrudRepository<RedisRoleEntity, Integer> {
}
