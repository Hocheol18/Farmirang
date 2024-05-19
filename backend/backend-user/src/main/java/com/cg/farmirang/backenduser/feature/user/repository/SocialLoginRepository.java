package com.cg.farmirang.backenduser.feature.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.farmirang.backenduser.feature.user.entity.SocialLogin;

public interface SocialLoginRepository extends JpaRepository<SocialLogin, Integer>, SocialLoginRepositoryCustom{

	Optional<SocialLogin> findByProviderAndSub(String provider, String sub);

}
