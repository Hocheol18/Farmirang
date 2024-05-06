package com.cg.farmirang.backenduser.feature.user.service;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.backenduser.global.common.code.ErrorCode;
import com.cg.farmirang.backenduser.global.exception.BusinessExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CompleteMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CompletedMultipartUpload;
import software.amazon.awssdk.services.s3.model.CompletedPart;
import software.amazon.awssdk.services.s3.model.CreateMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CreateMultipartUploadResponse;
import software.amazon.awssdk.services.s3.model.UploadPartRequest;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3ServiceImpl implements S3Service {
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	@Value("${com.farmirang.user.default_profile}")
	private String defaultProfile;

	private final S3Client s3;

	@Override
	public String upload(MultipartFile file, String dir, String uniqueName) {
		if(file == null || file.isEmpty()) return defaultProfile;
		var originalFilename = file.getOriginalFilename();
		var extension = checkInvalidExtension(originalFilename);
		var filename = originalFilename+"_"+uniqueName+"."+extension;

		log.info("S3ServiceImpl upload: Uploading file to S3, filename : {}", filename);
		log.info("S3ServiceImpl upload: Uploading file to S3, file type : {}", file.getContentType());
		log.info("S3ServiceImpl upload: Uploading file to S3, file size : {}", file.getSize());

		CreateMultipartUploadRequest request = CreateMultipartUploadRequest.builder()
				.bucket(bucket)
				.key(dir+"/"+filename)
				.build();
		CreateMultipartUploadResponse response = s3.createMultipartUpload(request);
		String uploadId = response.uploadId();
		log.info("S3ServiceImpl upload: UploadId : {}", uploadId);
		UploadPartRequest partRequest = UploadPartRequest.builder()
				.bucket(bucket)
				.key(dir+"/"+filename)
				.uploadId(uploadId)
				.partNumber(1)
				.build();
		try {
			String etag = s3.uploadPart(partRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize())).eTag();
			log.info("S3ServiceImpl upload: Etag : {}", etag);
			CompletedPart part = CompletedPart.builder().partNumber(1).eTag(etag).build();
			CompletedMultipartUpload completedMultipartUpload = CompletedMultipartUpload.builder()
				.parts(part)
				.build();
			CompleteMultipartUploadRequest completeMultipartUploadRequest = CompleteMultipartUploadRequest.builder()
				.bucket(bucket)
				.key(dir+"/"+filename)
				.uploadId(uploadId)
				.multipartUpload(completedMultipartUpload)
				.build();

			s3.completeMultipartUpload(completeMultipartUploadRequest);

		} catch (IOException e) {
			throw new BusinessExceptionHandler("파일 업로드 중 오류가 발생했습니다", ErrorCode.IO_ERROR);
		}

		return "";
	}

	@Override
	public void delete(String filename) {

	}

	private String checkInvalidExtension(String filename) {
		if(filename == null || filename.isEmpty()) {
			log.error("S3ServiceImpl checkInvalidExtension: FIlename is null");
			throw new BusinessExceptionHandler("파일이 존재하지 않습니다", ErrorCode.INVALID_IMAGE_EXTENTION_ERROR);
		}
		String extension = filename.substring(filename.lastIndexOf(".")+1).toLowerCase();
		if(!Arrays.asList("jpg", "jpeg", "png").contains(extension)) {
			log.error("S3ServiceImpl checkInvalidExtension: Invalid extension, {}", filename);
			throw new BusinessExceptionHandler("지원하지 않는 확장자입니다", ErrorCode.INVALID_IMAGE_EXTENTION_ERROR);
		}
		return extension;
	}
}
