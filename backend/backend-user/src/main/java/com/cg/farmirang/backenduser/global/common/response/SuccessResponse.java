package com.cg.farmirang.backenduser.global.common.response;

import com.cg.farmirang.backenduser.global.common.code.SuccessCode;

import lombok.Builder;
import lombok.Getter;

/**
 * [공통] API Response 결과의 반환 값을 관리
 */
@Getter
public class SuccessResponse<T> {

    // API 응답 결과 Response
    private T data;

    // API 응답 코드 Response
    // private int status;
    private SuccessCode status;

    // API 응답 코드 Message
    private String message;

    @Builder
    // public SuccessResponse(final T data, final int status, final String message) {
    public SuccessResponse(final T data, final SuccessCode status, final String message) {
        this.data = data;
        this.status = status;
        this.message = message;
    }

}