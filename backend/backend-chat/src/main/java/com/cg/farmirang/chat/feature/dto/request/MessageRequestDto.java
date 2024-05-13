package com.cg.farmirang.chat.feature.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequestDto {
    @NotNull(message = "회원 아이디를 입력해주세요")
    private Integer senderId;
    @NotNull(message = "회원 닉네임을 입력해주세요")
    private String senderNickname;
    @NotNull(message = "채팅방 아이디를 입력해주세요")
    private String chatRoomId;
    private String message;
}
