package com.cg.farmirang.backenduser.feature.user.service;

import org.springframework.web.multipart.MultipartFile;

public class S3ServiceImpl implements S3Service {
	@Override
	public String upload(MultipartFile file, String dir, String uniqueName) {
		return "";
	}

	@Override
	public void delete(String filename) {

	}
}
