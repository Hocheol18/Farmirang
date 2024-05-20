package com.cg.farmirang.design.global.common.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
class JwtClientTest {

    @Autowired
    JwtClient jwtClient;

    @Test
    public void jwt_test(){
        String accessToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJleHAiOjE3MTU2NDY3NzUsImlkIjoxMCwicm9sZSI6Ik1FTUJFUiIsImRldmljZV9pZCI6IjBjNmJmMDM4LWZlY2MtNGZiOC1hMjkxLTQ1OTMyMjZjMGFjYSJ9.QtOqJE7NhNG43dXhjs_0lbO1vbodW_qznVqVtM-DZi7qZI2FZWf5thk1Ox092U9Pc5DHtJgoFvnHp9NHEvRidQ";
        var res = jwtClient.validateAccessToken(accessToken);
        System.out.println("res = " + res);
        assertEquals(res.memberId(),10);
    }

}