package com.cg.farmirang.chat.feature.service;

import com.cg.farmirang.chat.feature.dto.request.ChatRoomCreateRequestDto;
import com.cg.farmirang.chat.feature.dto.response.ChatRoomGetResponseDto;
import com.cg.farmirang.chat.feature.dto.response.ChatRoomListGetResponseDto;
import jakarta.validation.constraints.NotBlank;

public interface ChatRoomService {
    ChatRoomListGetResponseDto selectChatRoomList(@NotBlank Integer memberId);

    String createChatRoom(Integer firstMemberId, ChatRoomCreateRequestDto request);

    ChatRoomGetResponseDto selectChatRoom(String chatRoomId, Integer memberId);
}
