package com.cg.farmirang.chat.feature.service;

import com.cg.farmirang.chat.feature.dto.request.ChatMessageRequestDto;
import com.cg.farmirang.chat.feature.entity.ChatMessage;
import com.cg.farmirang.chat.global.common.code.ErrorCode;
import com.cg.farmirang.chat.global.exception.BusinessExceptionHandler;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageServiceImpl implements ChatMessageService{
    @Override
    public ChatMessage sendMessage(ChatMessageRequestDto request) {
        return ChatMessage.toEntity(request);
    }
}
