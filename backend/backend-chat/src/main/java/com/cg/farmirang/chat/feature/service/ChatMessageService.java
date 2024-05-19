package com.cg.farmirang.chat.feature.service;

import com.cg.farmirang.chat.feature.dto.request.ChatMessageRequestDto;
import com.cg.farmirang.chat.feature.entity.ChatMessage;

import java.util.List;

public interface ChatMessageService {
    void sendMessage(ChatMessageRequestDto request);

    List<ChatMessage> getMessages(String chatRoomId);

    ChatMessage getMessage(ChatMessage chatMessage);
}
