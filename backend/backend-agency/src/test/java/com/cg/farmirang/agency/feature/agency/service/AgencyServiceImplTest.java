package com.cg.farmirang.agency.feature.agency.service;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.agency.feature.agency.dto.request.AdminAgencyListRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.request.AdminApproveRequestDto;
import com.cg.farmirang.agency.feature.agency.dto.request.AgencyRegisterRequestDto;
import com.cg.farmirang.agency.feature.agency.repository.WelfareFacilityRepository;

@SpringBootTest
class AgencyServiceImplTest {
	@Autowired
	AgencyService svc;
	@Autowired
	WelfareFacilityRepository repo;

	private int agencyId = 3;
	private int memberId = 8;
	private String name = "test-name";
	private String address = "test-address";
	private String reportNumber = "test-reportNumber";
	private String contact = "test-contact";
	private String imgPath = "discord.png";
	private boolean approvalTrue = true;
	private boolean approvalFalse = false;
	private String reasonTrue = "test-reason-true";
	private String reasonFalse = "test-reason-false";


	@Test
	void registerAgencyService() throws IOException {
		var req = AgencyRegisterRequestDto.builder()
			.name(name)
			.address(address)
			.report(reportNumber)
			.contact(contact)
			.build();
		var file = new File(imgPath);
		MultipartFile img = new MockMultipartFile(file.getName(), file.getName(), "image/png", new FileInputStream(file));
		var res = svc.registerAgencyService(memberId, req, img);

		System.out.println(res);
		assertNotNull(res);
		assertNotNull(res.id());

	}

	@Test
	void agencyProfileService() {
		var res = svc.agencyProfileService(memberId);
		System.out.println(res);
		assertNotNull(res);
		assertEquals(name, res.name());
		assertEquals(address, res.address());
		assertEquals(reportNumber, res.reportNumber());
		assertEquals(contact, res.contact());
	}

	@Test
	void agencyDetailService() {
		var res = svc.agencyDetailService(memberId);
		System.out.println(res);
		assertNotNull(res);
		assertEquals(name, res.name());
		assertEquals(address, res.address());
		assertEquals(agencyId, res.id());


	}

	@Test
	void agencyRegistrationCancelService() {
		int agencyId = 1;
		var res = svc.agencyRegistrationCancelService(memberId, agencyId);
		System.out.println(res);
		assertNotNull(res);
		assertNotNull(res.id());
		assertEquals(agencyId, res.id());
	}

	@Test
	void adminAgencyListService() {
		var req = AdminAgencyListRequestDto.builder()
			.cursor(0)
			.size(10)
			.build();
		var res = svc.adminAgencyListService(req);
		System.out.println(res);
		assertNotNull(res);
		assertFalse(res.agencies().isEmpty());
		assertTrue(agencyId >= res.cursor());
	}

	@Test
	void adminAgencyDetailService() {
		var res = svc.adminAgencyDetailService(agencyId);
		System.out.println(res);
		assertNotNull(res);
		assertEquals(agencyId, res.id());
		assertEquals(name, res.name());
		assertEquals(address, res.address());
		assertEquals(reportNumber, res.reportNumber());
		assertNotNull(res.img());
	}

	@Test
	void adminApproveAgencyService() {
		var reqTrue = AdminApproveRequestDto.builder()
			.agencyId(agencyId)
			.approval(approvalTrue)
			.reason(reasonTrue)
			.build();
		var reqFalse = AdminApproveRequestDto.builder()
			.agencyId(agencyId)
			.approval(approvalFalse)
			.reason(reasonFalse)
			.build();
		var resTrue = svc.adminApproveAgencyService(reqTrue);
		var entityTrue = repo.findById(agencyId).get();
		System.out.println(resTrue);
		System.out.println(entityTrue);
		assertNotNull(resTrue);
		assertEquals(agencyId, resTrue.id());
		assertEquals(approvalTrue, entityTrue.getApproval());
		assertEquals(reasonTrue, entityTrue.getReason());
		var resFalse = svc.adminApproveAgencyService(reqFalse);
		var entityFalse = repo.findById(agencyId).get();
		System.out.println(resFalse);
		System.out.println(entityFalse);
		assertNotNull(resFalse);
		assertEquals(agencyId, resFalse.id());
		assertEquals(approvalFalse, entityFalse.getApproval());
		assertEquals(reasonFalse, entityFalse.getReason());
		var reqEmpty = AdminApproveRequestDto.builder()
			.agencyId(agencyId)
			.approval(null)
			.reason(null)
			.build();
		assertThrows(Exception.class, () -> svc.adminApproveAgencyService(reqEmpty));

	}
}