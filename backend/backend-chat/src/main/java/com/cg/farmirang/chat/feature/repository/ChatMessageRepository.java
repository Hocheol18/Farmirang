package com.cg.farmirang.chat.feature.repository;

import com.cg.farmirang.chat.feature.entity.ChatMessage;
import com.cg.farmirang.chat.feature.entity.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findAllByRoomId(String roomId);

    Optional<ChatMessage> findTopByRoomIdOrderBySendTimeDesc(String roomId);
}
