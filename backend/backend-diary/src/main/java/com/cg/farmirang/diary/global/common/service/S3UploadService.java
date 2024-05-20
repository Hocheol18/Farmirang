package com.cg.farmirang.diary.global.common.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.cg.farmirang.diary.global.common.code.ErrorCode;
import com.cg.farmirang.diary.global.exception.BusinessExceptionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayInputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class S3UploadService {

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	public String makeDir(){
		String folderPath = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));

		amazonS3.putObject(bucket, folderPath + "/", new ByteArrayInputStream(new byte[0]), new ObjectMetadata());
		return folderPath;
	}
	public String saveFile(MultipartFile multipartFile) {
		if(multipartFile!= null && !multipartFile.isEmpty()) {
			String folderPath = makeDir();
			String uuid = UUID.randomUUID().toString();
			String originalFilename = uuid+multipartFile.getOriginalFilename();

			//파일 확장자 확인
			validateFileExtension(multipartFile.getOriginalFilename());

			log.info("원본 파일명 : "+multipartFile.getOriginalFilename());
			log.info("파일명 : "+originalFilename);
			log.info("파일 타입 : " +multipartFile.getContentType());
			log.info("파일 크기 : " +multipartFile.getSize());

			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentLength(multipartFile.getSize());
			metadata.setContentType(multipartFile.getContentType());
			try {
				amazonS3.putObject(bucket + "/" + folderPath, originalFilename, multipartFile.getInputStream(), metadata);
			}catch (Exception e){
				log.debug(e.getMessage());
				throw new BusinessExceptionHandler("파일 업로드 중 에러 발생", ErrorCode.FAIL_FILE_UPLOAD);
			}
			return amazonS3.getUrl(bucket+"/"+folderPath, originalFilename).toString();
		}
		else {
			throw new BusinessExceptionHandler("이미지가 없습니다.", ErrorCode.EMPTY_IMAGE);
		}
	}

	public void deleteImage(String imgsrc)  {
		try {
			if(imgsrc !=null && !"".equals(imgsrc)) {
				//            String path = imgsrc.substring(0,imgsrc.lastIndexOf(bucket)+);
				String fileName = imgsrc.substring(imgsrc.lastIndexOf(bucket)+bucket.length()+1);
				//            System.out.println(path);
				System.out.println(fileName);

				amazonS3.deleteObject(bucket, fileName);
			}
		}catch (Exception e){
			log.debug(e.getMessage());
			throw new BusinessExceptionHandler("사진 삭제 중 에러 발생", ErrorCode.FAIL_FILE_DELETE);
		}
	}

	// 파일 확장자 체크
	private void validateFileExtension(String originalFilename) {
		String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
		List<String> allowedExtensions = Arrays.asList("jpg", "png", "jpeg");

		if (!allowedExtensions.contains(fileExtension)) {
			throw new BusinessExceptionHandler("지원하지 않는 파일 확장자입니다", ErrorCode.NOT_IMAGE_EXTENSION);
		}
	}
}