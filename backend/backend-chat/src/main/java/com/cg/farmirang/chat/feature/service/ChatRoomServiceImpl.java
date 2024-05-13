package com.cg.farmirang.chat.feature.service;

import com.cg.farmirang.chat.feature.dto.request.ChatRoomCreateRequestDto;
import com.cg.farmirang.chat.feature.dto.response.ChatRoomGetResponseDto;
import com.cg.farmirang.chat.feature.dto.response.ChatRoomListGetResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ChatRoomServiceImpl implements ChatRoomService{
    @Override
    public ChatRoomListGetResponseDto selectChatRoomList(Integer memberId) {
        return null;
    }

    @Override
    public String createChatRoom(Integer firstMemberId, ChatRoomCreateRequestDto request) {
        return null;
    }

    @Override
    public ChatRoomGetResponseDto selectChatRoom(Long chatRoomId, Integer memberId) {
        return null;
    }
}
