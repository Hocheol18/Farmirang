package com.cg.farmirang.donation.global.common.service;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.donation.global.common.code.ErrorCode;
import com.cg.farmirang.donation.global.exception.BusinessExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.AbortMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CompleteMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CompletedMultipartUpload;
import software.amazon.awssdk.services.s3.model.CompletedPart;
import software.amazon.awssdk.services.s3.model.CreateMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CreateMultipartUploadResponse;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.model.UploadPartRequest;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3ServiceImpl implements S3Service {
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	@Value("${cloud.aws.s3.url}")
	private String s3Url;

	private final S3Client s3;

	/**
	 * MultipartFile 타입의 이미지를 S3에 업로드함
	 *
	 * @param file 업로드할 이미지 파일
	 * @param dir 업로드할 디렉토리
	 * @param uniqueName 파일명에 추가할 고유값(ex. UUID)
	 * */
	@Override
	public String upload(MultipartFile file, String dir, String uniqueName) {
		if(file == null || file.isEmpty()) {
			log.error("S3ServiceImpl upload: File is null");
			throw new BusinessExceptionHandler("파일이 존재하지 않습니다", ErrorCode.NOT_FOUND_ERROR);
		}
		var originalFilename = file.getOriginalFilename();
		var extension = checkInvalidExtension(originalFilename);
		var filename = originalFilename.substring(0, originalFilename.lastIndexOf("."));
		var key = dir + "/" + filename+"_"+uniqueName+"."+extension;

		log.info("S3ServiceImpl upload: Uploading file to S3, filename : {}", key);
		log.info("S3ServiceImpl upload: Uploading file to S3, file type : {}", file.getContentType());
		log.info("S3ServiceImpl upload: Uploading file to S3, file size : {}", file.getSize());

		CreateMultipartUploadRequest request = CreateMultipartUploadRequest.builder()
				.bucket(bucket)
				.key(key)
				.build();
		CreateMultipartUploadResponse response = s3.createMultipartUpload(request);
		String uploadId = response.uploadId();
		log.info("S3ServiceImpl upload: UploadId : {}", uploadId);
		try {
			UploadPartRequest partRequest = UploadPartRequest.builder()
				.bucket(bucket)
				.key(key)
				.uploadId(uploadId)
				.partNumber(1)
				.build();
			String etag = s3.uploadPart(partRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize())).eTag();
			log.info("S3ServiceImpl upload: Etag : {}", etag);
			CompletedPart part = CompletedPart.builder().partNumber(1).eTag(etag).build();
			CompletedMultipartUpload completedMultipartUpload = CompletedMultipartUpload.builder()
				.parts(part)
				.build();
			CompleteMultipartUploadRequest completeMultipartUploadRequest = CompleteMultipartUploadRequest.builder()
				.bucket(bucket)
				.key(key)
				.uploadId(uploadId)
				.multipartUpload(completedMultipartUpload)
				.build();

			s3.completeMultipartUpload(completeMultipartUploadRequest);

		} catch (IOException e) {
			log.error("S3ServiceImpl upload: Error while uploading file to S3, filename : {}", key);
			log.error("S3ServiceImpl upload: Error message : {}", e.getMessage());
			AbortMultipartUploadRequest abortMultipartUploadRequest = AbortMultipartUploadRequest.builder()
					.bucket(bucket)
					.key(key)
					.uploadId(uploadId)
					.build();
			s3.abortMultipartUpload(abortMultipartUploadRequest);
			throw new BusinessExceptionHandler("파일 업로드 중 오류가 발생했습니다", ErrorCode.S3_UPLOAD_ERROR);

		}

		return s3Url+"/"+key;
	}

	/**
	 * S3에 저장된 이미지를 삭제함
	 *
	 * @param filename 삭제할 이미지 파일명
	 * @param dir 삭제할 이미지 파일이 저장된 디렉토리
	 * */
	@Override
	public int delete(String filename, String dir) {
		if(filename == null || dir == null || filename.isBlank() || dir.isBlank()) {
			log.error("S3ServiceImpl delete: Filename or dir is null");
			throw new BusinessExceptionHandler("파일이 존재하지 않습니다", ErrorCode.NOT_FOUND_ERROR);
		}
		log.info("S3ServiceImpl delete: Deleting file from S3, filename : {}", filename);
		DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
				.bucket(bucket)
				.key(dir+"/"+filename)
				.build();
		try {
			var res = s3.deleteObject(deleteObjectRequest);
			var status = res.sdkHttpResponse().statusCode();
			log.info("S3ServiceImpl delete: Delete status : {}", status);
			return status;
		} catch (S3Exception e) {
			log.error("S3ServiceImpl delete: Error while deleting file from S3, filename : {}", filename);
			log.error("S3ServiceImpl delete: Error message : {}", e.getMessage());
			throw new BusinessExceptionHandler("파일 삭제 중 오류가 발생했습니다", ErrorCode.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 이미지 파일의 확장자를 체크함
	 * Spring boot는 heic 확장자를 지원하지 않아 확장자 확인 필요
	 *
	 * @param filename 이미지 파일명
	 * */
	private String checkInvalidExtension(String filename) {
		if(filename == null || filename.isBlank()) {
			log.error("S3ServiceImpl checkInvalidExtension: FIlename is null");
			throw new BusinessExceptionHandler("파일이 존재하지 않습니다", ErrorCode.NOT_FOUND_ERROR);
		}
		String extension = filename.substring(filename.lastIndexOf(".")+1).toLowerCase();
		if(!Arrays.asList("jpg", "jpeg", "png").contains(extension)) {
			log.error("S3ServiceImpl checkInvalidExtension: Invalid extension, {}", filename);
			throw new BusinessExceptionHandler("지원하지 않는 확장자입니다", ErrorCode.INVALID_IMAGE_EXTENTION_ERROR);
		}
		return extension;
	}
}
