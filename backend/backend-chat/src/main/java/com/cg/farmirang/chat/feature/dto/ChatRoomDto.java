package com.cg.farmirang.chat.feature.dto;

import com.cg.farmirang.chat.feature.entity.ChatRoom;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatRoomDto {
    private String chatRoomId;
    private String nickname;
    private String lastMessage;

    public static ChatRoomDto toDto(ChatRoom chatRoom, String friendNickname, String lastMessage){
        return ChatRoomDto.builder()
                .chatRoomId(chatRoom.getChatRoomUUID())
                .nickname(friendNickname)
                .lastMessage(lastMessage)
                .build();
    }
}
