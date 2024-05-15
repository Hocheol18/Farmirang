package com.cg.farmirang.chat.global.common.service;

import lombok.RequiredArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class StompPreHandler implements ChannelInterceptor {

    private final JwtClient jwtClient;
    private static final String BEARER_PREFIX = "Bearer ";
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        // websocket 연결 요청이 들어왔을 때 확인
        if (StompCommand.CONNECT == headerAccessor.getCommand()) {
            // header에서 token 추출
            String jwtToken = headerAccessor.getFirstNativeHeader("Authorization");
            String token = jwtToken.substring(BEARER_PREFIX.length());
            jwtClient.validateAccessToken(token);
        }
        return message;
    }

}
