package com.cg.farmirang.backenduser.feature.user.service;

import org.springframework.web.multipart.MultipartFile;

public interface S3Service {
	String upload(MultipartFile file, String dir, String uniqueName);
	void delete(String filename);
}
