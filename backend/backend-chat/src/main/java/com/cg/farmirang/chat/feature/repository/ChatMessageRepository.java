package com.cg.farmirang.chat.feature.repository;

import com.cg.farmirang.chat.feature.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findAllByRoomId(String roomId);
}
