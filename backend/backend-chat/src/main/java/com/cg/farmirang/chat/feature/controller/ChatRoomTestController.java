package com.cg.farmirang.chat.feature.controller;

import com.cg.farmirang.chat.feature.dto.ChatRoomDto;
import com.cg.farmirang.chat.feature.dto.request.ChatRoomCreateRequestDto;
import com.cg.farmirang.chat.feature.dto.response.ChatRoomGetResponseDto;
import com.cg.farmirang.chat.feature.dto.response.ChatRoomListGetResponseDto;
import com.cg.farmirang.chat.feature.service.ChatRoomService;
import com.cg.farmirang.chat.global.common.code.SuccessCode;
import com.cg.farmirang.chat.global.common.response.ErrorResponse;
import com.cg.farmirang.chat.global.common.response.SuccessResponse;
import com.cg.farmirang.chat.global.common.service.JwtClient;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/chats")
public class ChatRoomTestController {
    private final ChatRoomService chatRoomService;
//    private final JwtClient jwtClient;

    /* 채팅 홈 화면 */
    @GetMapping("/home")
    public String rooms() {
        return "chat/room";
    }

    /* 개인의 채팅방 목록 반환 */
    @GetMapping("/rooms/lists")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "채팅방 목록 조회에 성공했습니다.", content = {@Content(array = @ArraySchema(schema = @Schema(implementation = ChatRoomListGetResponseDto.class)))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public String room(/*@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken,*/ Model model) {
//        var result = jwtClient.validateAccessToken(accessToken);
//        ChatRoomListGetResponseDto response = chatRoomService.selectChatRoomList(result.memberId());
        ChatRoomListGetResponseDto response = chatRoomService.selectChatRoomList(11);
        List<ChatRoomDto> chatRoomDtoList = response.getChatRoomDtoList();
        model.addAttribute("chatRoomList",chatRoomDtoList);
        return "/chat/list";
    }

    /* 채팅방 생성 */
    @PostMapping("/rooms")
    @Operation(summary = "채팅방 생성", description = "새로운 채팅방을 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "새로운 채팅방을 성공하였습니다.", content = {@Content(schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "없는 회원입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public String createRoom(@ModelAttribute ChatRoomCreateRequestDto request/*, @Parameter(hidden = true) @RequestHeader("Authorization") String accessToken*/,Model model) {
//        var result = jwtClient.validateAccessToken(accessToken);
//        String chatRoomId = chatRoomService.createChatRoom(result.memberId(), request);
        String chatRoomId = chatRoomService.createChatRoom(11, request);
        model.addAttribute("chatRoomId", chatRoomId);
        return "/chat/createdRoom";
    }

    /* 채팅방 조회 */
    @GetMapping("/rooms/{chatRoomId}")
    @Operation(summary = "채팅방 상세 조회", description = "채팅방을 상세 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "채팅방 상세 조회에 성공했습니다.", content = {@Content(array = @ArraySchema(schema = @Schema(implementation = ChatRoomGetResponseDto.class)))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public String selectChatRoom(@PathVariable("chatRoomId") Long chatRoomId/*, @Parameter(hidden = true) @RequestHeader("Authorization") String accessToken*/) {
//        var result = jwtClient.validateAccessToken(accessToken);
//        ChatRoomGetResponseDto response = chatRoomService.selectChatRoom(chatRoomId, result.memberId());
        ChatRoomGetResponseDto response = chatRoomService.selectChatRoom(chatRoomId, 11);
        return "/chat/roomdetail";
    }


}
