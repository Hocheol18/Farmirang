package com.cg.farmirang.chat.feature.controller;

import com.cg.farmirang.chat.feature.dto.request.ChatMessageRequestDto;
import com.cg.farmirang.chat.feature.entity.ChatMessage;
import com.cg.farmirang.chat.feature.repository.ChatMessageRepository;
import com.cg.farmirang.chat.feature.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
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


    /* 메시지 보내기 */
    @MessageMapping("/message/{roomId}")
    @Transactional
    public void message(ChatMessageRequestDto request){
        chatMessageService.sendMessage(request);
    }

    /* 메시지 받기 */
    @KafkaListener(topics = "${spring.kafka.template.default-topic}", groupId = "${spring.kafka.consumer.group-id}")
    public void kafkaMessageListener(ChatMessage chatMessage) {
        ChatMessage message = chatMessageService.getMessage(chatMessage);

        sendingOperations.convertAndSend("/queue/chats/rooms/"+message.getRoomId(),message);
    }
}
