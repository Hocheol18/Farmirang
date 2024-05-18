package com.cg.farmirang.chat.feature.service;

import com.cg.farmirang.chat.feature.dto.request.ChatMessageRequestDto;
import com.cg.farmirang.chat.feature.entity.ChatMessage;
import com.cg.farmirang.chat.feature.repository.ChatMessageRepository;
import com.cg.farmirang.chat.global.common.code.ErrorCode;
import com.cg.farmirang.chat.global.exception.BusinessExceptionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService{

    private final KafkaTemplate<String, ChatMessage> kafkaTemplate;
    private final NewTopic topic;
    private final ChatMessageRepository chatMessageRepository;

    /**
     * 메시지 보내기
     *
     * @param request
     */
    @Override
    public void sendMessage(ChatMessageRequestDto request) {
        try {
            ChatMessage chatMessage = ChatMessage.toEntity(request);
            kafkaTemplate.send(topic.name(), chatMessage);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessExceptionHandler(ErrorCode.KAFKA_ERROR);
        }
    }

    /**
     * 저장된 메시지 가져오기
     * @param chatRoomId
     * @return
     */
    @Override
    public List<ChatMessage> getMessages(String chatRoomId) {
        List<ChatMessage> messages = chatMessageRepository.findAllByRoomId(chatRoomId);
        return messages;
    }

    /**
     * 메시지 받아서 시간 추가하고 저장
     * @param chatMessage
     * @return
     */
    @Override
    public ChatMessage getMessage(ChatMessage chatMessage) {
        chatMessage.setSendTime(LocalDateTime.now());
        ChatMessage updatedMessage = chatMessageRepository.save(chatMessage);
        return updatedMessage;
    }
}
