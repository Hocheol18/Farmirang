package com.cg.farmirang.agency;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
@EnableFeignClients
public class BackendAgencyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendAgencyApplication.class, args);
	}

}
