package com.cg.farmirang.chat.global.config;

import com.cg.farmirang.chat.global.common.code.ErrorCode;
import com.cg.farmirang.chat.global.common.response.ErrorResponse;
import com.cg.farmirang.chat.global.common.response.SuccessResponse;
import com.cg.farmirang.chat.global.exception.BusinessExceptionHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import feign.codec.Decoder;
import feign.codec.ErrorDecoder;
import feign.codec.StringDecoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.SpringDecoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.ResolvableType;

import java.io.IOException;
import java.util.Arrays;

@Configuration
@Slf4j
public class FeignClientConfig {
	@Bean
	public Decoder decoder(ObjectFactory<HttpMessageConverters> messageConverters) {
		var decoder = new SpringDecoder(messageConverters);
		return (res, type) -> {
			var returnType = TypeFactory.rawClass(type);
			var forClassWithGenerics = ResolvableType.forClassWithGenerics(SuccessResponse.class, returnType);
			log.info("response : {}", res.toString());
			log.info("returnType : {}", returnType);

			try {
				return ((SuccessResponse<?>) decoder.decode(res, forClassWithGenerics.getType())).getData();
			} catch (Exception e) {
				return (ErrorResponse) decoder.decode(res, forClassWithGenerics.getType());
			}
		};
	}

	@Bean
	public ErrorDecoder errorDecoder(){
		var stringDecoder = new StringDecoder();
		return (methodKey, response) -> {
			switch (response.status()) {
				case 400:
					return new BusinessExceptionHandler("잘못된 요청입니다.", ErrorCode.BAD_REQUEST_ERROR);
				case 401:
					String msg = null;
					ErrorResponse errorResponse = null;
					var mapper = new ObjectMapper();
					try {
						msg = stringDecoder.decode(response, String.class).toString();
						errorResponse = mapper.readValue(msg, ErrorResponse.class);
					} catch (IOException ex) {
						log.error("FeignClientConfig errorDecoder JsonProcessingException : {}", ex.getMessage());
						log.error(Arrays.toString(ex.getStackTrace()));
						throw new BusinessExceptionHandler("서버 에러", ErrorCode.INTERNAL_SERVER_ERROR);
					}
					return new BusinessExceptionHandler(errorResponse.getReason(), ErrorCode.TOKEN_ERROR);
				case 403:
					return new BusinessExceptionHandler("권한이 없습니다.", ErrorCode.FORBIDDEN_ERROR);
				case 404:
					return new BusinessExceptionHandler("요청한 자원을 찾을 수 없습니다.", ErrorCode.NOT_FOUND_ERROR);
				default:
					return new Exception(response.reason());

			}
		};
	}


}
