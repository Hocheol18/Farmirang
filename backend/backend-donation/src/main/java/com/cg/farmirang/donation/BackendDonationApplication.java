package com.cg.farmirang.donation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing
@EnableFeignClients
public class BackendDonationApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendDonationApplication.class, args);
	}

}
