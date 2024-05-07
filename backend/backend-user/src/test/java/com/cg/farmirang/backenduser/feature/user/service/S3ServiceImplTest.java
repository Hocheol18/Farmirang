package com.cg.farmirang.backenduser.feature.user.service;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@SpringBootTest
class S3ServiceImplTest {
	@Autowired
	private S3ServiceImpl s3;

	String dir = "farmirang/profile";

	@Test
	void upload() throws IOException {
		File file = new File("discord.png");
		MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(), "image/png", new FileInputStream(file));
		String uuid = UUID.randomUUID().toString();

		String result = s3.upload(multipartFile, dir, uuid);
		assertNotNull(result);
		assertNotEquals(result, "");
	}

	@Test
	void delete() {
		String filename = "discord_ae0eb2b0-bf15-45d9-a6cc-4cad3e63d457.png";
		var status = s3.delete(filename, dir);
		System.out.println(status);
		assertEquals(status, 204);
	}
}