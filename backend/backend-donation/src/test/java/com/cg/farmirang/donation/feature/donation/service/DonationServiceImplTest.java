package com.cg.farmirang.donation.feature.donation.service;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.donation.feature.donation.dto.common.CropCommonDto;
import com.cg.farmirang.donation.feature.donation.dto.request.GetDonationListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.request.RegisterDonationRequestDto;

@SpringBootTest
class DonationServiceImplTest {
	@Autowired
	DonationService svc;

	Integer memberId = 11;
	String address = "test delivery address";
	String title = "test title";
	List<CropCommonDto> crops = List.of(new CropCommonDto(1, 1, "개"));
	LocalDateTime startDate = LocalDateTime.now();
	LocalDateTime endDate = LocalDateTime.now().plusDays(5);
	String content = "test content";
	String summary = "test summary";
	String headerPath = "default.png";
	String mainPath = "default.png";

	@Test
	void registerDonationService() throws IOException {
		var dto = RegisterDonationRequestDto.builder()
				.address(address)
				.title(title)
				.crops(crops)
				.startDate(startDate)
				.endDate(endDate)
				.content(content)
				.summary(summary)
				.build();
		var headerFile = new File(headerPath);
		var mainFile = new File(mainPath);
		MultipartFile header = new MockMultipartFile(headerFile.getName(), headerFile.getName(), "image/png", new FileInputStream(headerFile));
		MultipartFile main = new MockMultipartFile(mainFile.getName(), mainFile.getName(), "image/png", new FileInputStream(mainFile));
		var res = svc.registerDonationService(memberId, dto, header, main);
		System.out.println(res);
		assertNotNull(res);
	}

	@Test
	void deleteDonationService() {
		int boardId = 2;
		var res = svc.deleteDonationService(memberId, boardId);
		System.out.println(res);
		assertNotNull(res);
		assertEquals(res.id(), boardId);
	}

	@Test
	void getDonationListService() {
		int cursor = 0;
		int size = 10;
		var dto = GetDonationListServiceRequestDto.builder()
				.cursor(cursor)
				.size(size)
				.build();
		var res = svc.getDonationListService(dto);
		System.out.println(res);
		assertNotNull(res);
		assertTrue(cursor <= res.cursor());
		assertNotEquals(0, res.posts().size());
	}

	@Test
	void getDonationDetailService() {
		int boardId = 2;
		var res = svc.getDonationDetailService(boardId);
		System.out.println(res);
		assertNotNull(res);
		assertEquals(boardId, res.id());

	}
}