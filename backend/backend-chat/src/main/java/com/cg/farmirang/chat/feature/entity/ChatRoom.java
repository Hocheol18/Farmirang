package com.cg.farmirang.chat.feature.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private Long id;
    private String chatRoomId;
    private Integer firstMemberId;
    private Integer secondMemberId;

    @Builder
    public ChatRoom(String chatRoomId, Integer firstMemberId, Integer secondMemberId) {
        this.chatRoomId = UUID.randomUUID().toString();
        this.firstMemberId = firstMemberId;
        this.secondMemberId = secondMemberId;
    }
}
