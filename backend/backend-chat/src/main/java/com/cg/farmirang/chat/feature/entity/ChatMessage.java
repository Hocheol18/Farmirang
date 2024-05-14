package com.cg.farmirang.chat.feature.entity;

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
public class ChatMessage {
    @Id
    private String id;
    private String roomId;
    private Integer senderId;
    private String senderNickname;
    private String message;
    private LocalDateTime sendTime;
}
