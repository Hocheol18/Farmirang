package com.cg.farmirang.chat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableFeignClients
//@ComponentScan(basePackages = {"com.cg.farmirang.chat.feature"})
public class BackendChatApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendChatApplication.class, args);
    }

}
