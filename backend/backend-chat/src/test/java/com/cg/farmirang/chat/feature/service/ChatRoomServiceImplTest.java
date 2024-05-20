package com.cg.farmirang.chat.feature.service;

import com.cg.farmirang.chat.feature.dto.ChatRoomDto;
import com.cg.farmirang.chat.feature.dto.request.ChatRoomCreateRequestDto;
import com.cg.farmirang.chat.feature.dto.response.ChatRoomListGetResponseDto;
import com.cg.farmirang.chat.feature.entity.ChatRoom;
import com.cg.farmirang.chat.feature.repository.ChatRoomRepository;
import com.cg.farmirang.chat.global.common.entity.Member;
import com.cg.farmirang.chat.global.common.repository.MemberRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ChatRoomServiceImplTest {

    @Autowired ChatRoomService chatRoomService;
    @Autowired
    ChatRoomRepository chatRoomRepository;
    @Autowired
    MemberRepository memberRepository;

    @Test
    @Disabled
    public void 채팅방생성(){
        //given
        Integer firstMemberId=10;
        Integer secondMemberId=1;

        // when
        ChatRoomCreateRequestDto request = ChatRoomCreateRequestDto.builder().memberId(secondMemberId).build();
        String chatRoomId = chatRoomService.createChatRoom(firstMemberId, request);

        // then
        System.out.println("chatRoomId = " + chatRoomId);
    }

    @Test
    @Disabled
    public void 채팅방리스트조회() {
        // given
        Integer memberId = 10;

        // when
        ChatRoomListGetResponseDto response = chatRoomService.selectChatRoomList(memberId);

        // then
        for (ChatRoomDto chatRoomDto : response.getChatRoomDtoList()) {
            System.out.println(chatRoomDto.toString());


        }
    }
}