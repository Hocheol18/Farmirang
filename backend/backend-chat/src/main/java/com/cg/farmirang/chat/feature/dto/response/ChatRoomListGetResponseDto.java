package com.cg.farmirang.chat.feature.dto.response;

import com.cg.farmirang.chat.feature.dto.ChatRoomDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ChatRoomListGetResponseDto {
    private List<ChatRoomDto> chatRoomDtoList;
}
