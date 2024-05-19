package com.cg.farmirang.chat.feature.entity;

import com.cg.farmirang.chat.feature.dto.request.ChatMessageRequestDto;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@ToString
@Document(collection="chat_message")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    @Id
    private String id;
    private String roomId;
    private Integer senderId;
    private String senderNickname;
    private String message;
    private LocalDateTime sendTime;

    public static ChatMessage toEntity(ChatMessageRequestDto chatMessageRequestDto) {
        return ChatMessage.builder()
                .roomId(chatMessageRequestDto.getRoomId())
                .senderId(chatMessageRequestDto.getSenderId())
                .senderNickname(chatMessageRequestDto.getSenderNickname())
                .message(chatMessageRequestDto.getMessage())
                .build();
    }
}
