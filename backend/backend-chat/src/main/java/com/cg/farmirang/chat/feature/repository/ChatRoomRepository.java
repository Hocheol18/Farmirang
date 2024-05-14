package com.cg.farmirang.chat.feature.repository;

import com.cg.farmirang.chat.feature.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findAllByFirstMemberIdOrSecondMemberId(Integer memberIdFirst, Integer memberIdSecond);
}
