package com.cg.farmirang.design.global.common.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.cg.farmirang.design.global.common.response.JwtValidationResponseDto;
import com.cg.farmirang.design.global.config.FeignClientConfig;

@FeignClient(name = "JwtValidationClient", url = "${com.farmirang.openfeign.jwt}", configuration = FeignClientConfig.class)
public interface JwtClient {
	@GetMapping("/v1/security/validate")
	JwtValidationResponseDto validateAccessToken(@RequestHeader("Access-token") String accessToken);
	@GetMapping("/v1/security/validate")
	JwtValidationResponseDto validateRefreshToken(@RequestHeader("Refresh-token") String refreshToken, @RequestHeader("device-id") String deviceId);
}
