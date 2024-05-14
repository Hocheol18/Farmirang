package com.cg.farmirang.chat.feature.service;

import com.cg.farmirang.chat.feature.dto.request.ChatMessageRequestDto;
import com.cg.farmirang.chat.feature.entity.ChatMessage;

public interface ChatMessageService {
    ChatMessage sendMessage(ChatMessageRequestDto request);
}
