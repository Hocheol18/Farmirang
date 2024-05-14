package com.cg.farmirang.chat.feature.controller;

import com.cg.farmirang.chat.feature.dto.request.ChatMessageRequestDto;
import com.cg.farmirang.chat.feature.entity.ChatMessage;
import com.cg.farmirang.chat.feature.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final SimpMessageSendingOperations sendingOperations;

    @MessageMapping("/message")
    @Transactional
    public void message(ChatMessageRequestDto request){
        ChatMessage chatMessage = chatMessageService.sendMessage(request);
        System.out.println(chatMessage.getMessage());
        sendingOperations.convertAndSend("/queue/chats/rooms/"+chatMessage.getRoomId(),chatMessage);
    }
}
