package com.cg.farmirang.chat.feature.controller;

import com.cg.farmirang.chat.feature.dto.request.ChatMessageRequestDto;
import com.cg.farmirang.chat.feature.entity.ChatMessage;
import com.cg.farmirang.chat.feature.repository.ChatMessageRepository;
import com.cg.farmirang.chat.feature.service.ChatMessageService;
import com.cg.farmirang.chat.global.config.KafkaConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final SimpMessageSendingOperations sendingOperations;
    private final ChatMessageRepository chatMessageRepository;

    @Value(value = "${spring.kafka.consumer.group-id}")
    private String groupId;

    @MessageMapping("/message")
    @Transactional
    @KafkaListener(topics = "groupId")
    public void message(ChatMessageRequestDto request){
        ChatMessage chatMessage=chatMessageService.sendMessage(request);
        chatMessageRepository.save(chatMessage);
        sendingOperations.convertAndSend("/queue/chats/rooms/"+chatMessage.getRoomId(),chatMessage);
    }
}
