package com.cg.farmirang.chat.feature.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long id;
    @Column(name = "chat_room_uuid")
    private String chatRoomUUID;
    private Integer firstMemberId;
    private Integer secondMemberId;

    @Builder
    public ChatRoom(Integer firstMemberId, Integer secondMemberId) {
        this.chatRoomUUID = UUID.randomUUID().toString();
        this.firstMemberId = firstMemberId;
        this.secondMemberId = secondMemberId;
    }

}
