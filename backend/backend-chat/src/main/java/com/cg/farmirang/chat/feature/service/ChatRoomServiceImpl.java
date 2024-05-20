package com.cg.farmirang.chat.feature.service;

import com.cg.farmirang.chat.feature.dto.ChatRoomDto;
import com.cg.farmirang.chat.feature.dto.request.ChatRoomCreateRequestDto;
import com.cg.farmirang.chat.feature.dto.response.ChatRoomGetResponseDto;
import com.cg.farmirang.chat.feature.dto.response.ChatRoomListGetResponseDto;
import com.cg.farmirang.chat.feature.entity.ChatMessage;
import com.cg.farmirang.chat.feature.entity.ChatRoom;
import com.cg.farmirang.chat.feature.repository.ChatMessageRepository;
import com.cg.farmirang.chat.feature.repository.ChatRoomRepository;
import com.cg.farmirang.chat.global.common.code.ErrorCode;
import com.cg.farmirang.chat.global.common.entity.Member;
import com.cg.farmirang.chat.global.common.repository.MemberRepository;
import com.cg.farmirang.chat.global.exception.BusinessExceptionHandler;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final EntityManager em;

    /**
     * 개인의 전체 채팅방 리스트 조회
     *
     * @param memberId
     * @return
     */
    @Override
    public ChatRoomListGetResponseDto selectChatRoomList(Integer memberId) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllByFirstMemberIdOrSecondMemberId(memberId, memberId);

        if (chatRoomList.isEmpty()) return null;

        List<ChatRoomDto> chatRoomDtoList = new ArrayList<>();

        for (ChatRoom chatRoom : chatRoomList) {
            Integer friendId = (memberId.equals(chatRoom.getFirstMemberId())) ? chatRoom.getSecondMemberId() : chatRoom.getFirstMemberId();
            String friendNickname = memberRepository.findNicknameByMemberId(friendId).orElseThrow(() -> new BusinessExceptionHandler(ErrorCode.MEMBER_NOT_FOUND));
            ChatMessage chatMessage = chatMessageRepository.findTopByRoomIdOrderBySendTimeDesc(chatRoom.getChatRoomUUID()).orElse(null);
            chatRoomDtoList.add(ChatRoomDto.toDto(chatRoom, friendNickname, (chatMessage!=null)? chatMessage.getMessage() : null));
        }

        return ChatRoomListGetResponseDto.builder().chatRoomDtoList(chatRoomDtoList).build();
    }

    /**
     * 채팅방 생성
     *
     * @param firstMemberId
     * @param request
     * @return
     */
    @Override
    public String createChatRoom(Integer firstMemberId, ChatRoomCreateRequestDto request) {

        Member member = memberRepository.findById(request.getMemberId()).orElseThrow(() -> new BusinessExceptionHandler(ErrorCode.MEMBER_NOT_FOUND));

        ChatRoom chatRoom = chatRoomRepository.save(ChatRoom.builder().firstMemberId(firstMemberId).secondMemberId(request.getMemberId()).build());

        return chatRoom.getChatRoomUUID();
    }

    /**
     * 채팅방 상세정보 조회
     *
     * @param chatRoomId
     * @param memberId
     * @return
     */
    @Override
    public ChatRoomGetResponseDto selectChatRoom(String chatRoomId, Integer memberId) {
        ChatRoom chatRoom = chatRoomRepository.findByChatRoomUUID(chatRoomId).orElseThrow(() -> new BusinessExceptionHandler(ErrorCode.CHATROOM_NOT_FOUND));
        String senderNickname = memberRepository.findNicknameByMemberId(memberId).orElseThrow(() -> new BusinessExceptionHandler(ErrorCode.MEMBER_NOT_FOUND));
        Integer friendId = (memberId.equals(chatRoom.getFirstMemberId())) ? chatRoom.getSecondMemberId() : chatRoom.getFirstMemberId();
        String friendNickname = memberRepository.findNicknameByMemberId(friendId).orElseThrow(() -> new BusinessExceptionHandler(ErrorCode.MEMBER_NOT_FOUND));

        return ChatRoomGetResponseDto.builder()
                .chatRoomId(chatRoomId)
                .friendNickname(friendNickname)
                .senderNickname(senderNickname)
                .senderId(memberId)
                .build();
    }
}
