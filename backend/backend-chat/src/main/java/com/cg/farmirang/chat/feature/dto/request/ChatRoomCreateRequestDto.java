package com.cg.farmirang.chat.feature.dto.request;

import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatRoomCreateRequestDto {
    private Integer memberId;
}
