package com.cg.farmirang.donation.global.common.service;

import org.springframework.web.multipart.MultipartFile;

public interface S3Service {
	String upload(MultipartFile file, String dir, String uniqueName);
	int delete(String filename, String dir);
}
