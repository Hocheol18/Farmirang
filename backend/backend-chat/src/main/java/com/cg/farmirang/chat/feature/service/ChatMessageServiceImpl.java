package com.cg.farmirang.chat.feature.service;

import com.cg.farmirang.chat.feature.dto.request.ChatMessageRequestDto;
import com.cg.farmirang.chat.feature.entity.ChatMessage;
import com.cg.farmirang.chat.global.common.code.ErrorCode;
import com.cg.farmirang.chat.global.exception.BusinessExceptionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService{

    private final KafkaTemplate<String, ChatMessage> kafkaTemplate;
    private final NewTopic topic;
    @Override
    public ChatMessage sendMessage(ChatMessageRequestDto request) {
        try {
            ChatMessage chatMessage = ChatMessage.toEntity(request);
            kafkaTemplate.send(topic.name(), chatMessage);
            return chatMessage;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessExceptionHandler(ErrorCode.KAFKA_ERROR);
        }
    }
}
