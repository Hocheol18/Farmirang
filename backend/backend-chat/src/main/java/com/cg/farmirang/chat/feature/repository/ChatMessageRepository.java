package com.cg.farmirang.chat.feature.repository;

import com.cg.farmirang.chat.feature.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
}
