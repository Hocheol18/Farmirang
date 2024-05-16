package com.cg.farmirang.chat.feature.dto.response;

import com.cg.farmirang.chat.feature.entity.ChatMessage;
import lombok.*;

import java.util.List;

@Builder @Data
public class ChatRoomGetResponseDto {
    private String chatRoomId;
    private String friendNickname;
    private String senderNickname;
    private Integer senderId;
    private List<ChatMessage> chatMessages;
}
