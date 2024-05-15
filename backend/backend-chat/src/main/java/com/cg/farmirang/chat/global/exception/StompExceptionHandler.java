package com.cg.farmirang.chat.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.messaging.StompSubProtocolErrorHandler;

import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Slf4j
@Configuration
public class StompExceptionHandler extends StompSubProtocolErrorHandler {
    private static final byte[] EMPTY_PAYLOAD = new byte[0];
    public StompExceptionHandler(){super();}

    // 클라이언트가 전송한 메시지 처리하면서 발생한 예외 처리
    @Override
    public Message<byte[]> handleClientMessageProcessingError(Message<byte[]>clientMessage, Throwable ex){
        final Throwable exception = converterThrowException(ex);
        if (exception instanceof BusinessExceptionHandler) {
            return handleBuisinessException(clientMessage, exception);
        }
        // 비즈니스 예외가 아니면 부모 클래스로 처리
        return super.handleClientMessageProcessingError(clientMessage, ex);
    }

    // 비즈니스 예외 처리
    private Message<byte[]> handleBuisinessException(Message<byte[]> clientMessage, Throwable exception) {
        return prepareErrorMessage(clientMessage, exception.getMessage(), ((BusinessExceptionHandler) exception).getErrorCode().getDivisionCode());
    }

    // 오류 메시지 준비
    private Message<byte[]> prepareErrorMessage(Message<byte[]> clientMessage, String message, final String errorCode) {
        // STOMP 커맨드 ERROR로 설정
        final StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.ERROR);
        accessor.setMessage(errorCode);
        accessor.setLeaveMutable(true);
        setReceiptIdForClient(clientMessage, accessor);
        return MessageBuilder.createMessage(message != null ? message.getBytes(StandardCharsets.UTF_8) : EMPTY_PAYLOAD, accessor.getMessageHeaders());
    }

    // 클라이언트의 수신 ID 설정
    private void setReceiptIdForClient(Message<byte[]> clientMessage, StompHeaderAccessor accessor) {
        if (Objects.isNull(clientMessage)) {
            return;
        }
        final StompHeaderAccessor clientHeaderAccessor = MessageHeaderAccessor.getAccessor(clientMessage, StompHeaderAccessor.class);
        final String receiptId = Objects.isNull(clientHeaderAccessor) ? null : clientHeaderAccessor.getReceiptId();
        if (receiptId != null) {
            accessor.setReceiptId(receiptId);
        }
    }

    // 예외 변환
    private Throwable converterThrowException(final Throwable ex) {
        // MessageDeliveryException 타입의 예외면 원인 반환
        if (ex instanceof MessageDeliveryException) {
            return ex.getCause();
        }
        return ex;
    }

    // STOMP 프로토콜 레벨에서 발생한 예외를 처리
    @Override
    protected Message<byte[]> handleInternal(StompHeaderAccessor errorHeaderAccessor, byte[] errorPayload, Throwable cause, StompHeaderAccessor clientHeaderAccessor) {
        return MessageBuilder.createMessage(errorPayload, errorHeaderAccessor.getMessageHeaders());
    }

}
