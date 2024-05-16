package com.cg.farmirang.donation.feature.donation.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.donation.feature.donation.dto.request.GetDonationListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.request.RegisterDonationRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.DonationIdResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonationDetailResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonationListResponseDto;
import com.cg.farmirang.donation.feature.donation.entity.DonationBoard;
import com.cg.farmirang.donation.feature.donation.entity.DonationItem;
import com.cg.farmirang.donation.feature.donation.entity.DonationState;
import com.cg.farmirang.donation.feature.donation.repository.DonationBoardRepository;
import com.cg.farmirang.donation.feature.donation.repository.DonationItemRepository;
import com.cg.farmirang.donation.feature.farm.repository.CropRepository;
import com.cg.farmirang.donation.feature.user.repository.MemberRepository;
import com.cg.farmirang.donation.global.common.code.ErrorCode;
import com.cg.farmirang.donation.global.common.service.S3Service;
import com.cg.farmirang.donation.global.exception.BusinessExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {
	private final S3Service s3;
	private final DonationBoardRepository repo;
	private final DonationItemRepository ir;
	private final MemberRepository mr;
	private final CropRepository cr;

	@Value("${cloud.aws.s3.dir}")
	private String s3Dir;

	@Override
	@Transactional
	public DonationIdResponseDto registerDonationService(Integer memberId, RegisterDonationRequestDto data,
		MultipartFile headerImg, MultipartFile mainImg) {
		log.debug("DonationServiceImple registerDonationService memberId: {}", memberId);
		//. upload header image and get url
		var uuid = UUID.randomUUID().toString();
		var headerKey = s3.upload(headerImg, s3Dir, uuid);
		log.debug("DonationServiceImpl registerDonationService s3 upload success, headerKey: {}", headerKey);
		// upload main image and get url
		uuid = UUID.randomUUID().toString();
		var mainKey = s3.upload(mainImg, s3Dir, uuid);
		log.debug("DonationServiceImpl registerDonationService s3 upload success, mainKey: {}", mainKey);
		//  find member entity
		var member = mr.findById(memberId).orElseThrow(() -> new BusinessExceptionHandler("사용자가 없습니다",
			ErrorCode.NOT_FOUND_MEMBER_ERROR));
		// create board entity
		var req = DonationBoard.builder()
			.member(member)
			.headerImg(headerKey)
			.mainImg(mainKey)
			.title(data.title())
			.startDate(data.startDate())
			.endDate(data.endDate())
			.deliveryAddress(data.address())
			.content(data.content())
			.state(DonationState.DOING)
			.progress(0.0)
			.summary(data.summary())
			.registerDate(LocalDateTime.now())
			.build();
		// save entity
		var entity = repo.save(req);
		log.debug("DonationServiceImpl registerDonationService save entity success, entity id: {}", entity.getId());
		// create item entity
		List<DonationItem> items = data.crops().stream().map(c -> {
			var crop = cr.findById(c.id()).orElseThrow(() -> {
				log.warn("DonationServiceImpl registerDonationService crop not found, board id: {},  crop id: {}",
					entity.getId(), c.id());
				return new BusinessExceptionHandler("농작물을 찾을 수 없습니다", ErrorCode.NOT_FOUND_CROP_ERROR);
			});
			return DonationItem.builder()
				.board(entity)
				.crop(crop)
				.amount(c.amount())
				.unit(c.unit())
				.current(0)
				.build();
		}).toList();
		// save item entity
		ir.saveAll(items);

		// return board entity id
		return DonationIdResponseDto.builder().id(entity.getId()).build();
	}

	@Override
	@Transactional
	public DonationIdResponseDto deleteDonationService(Integer memberId, Integer boardId) {
		log.debug("DonationServiceImpl deleteDonationService memberId: {}, boardId: {}", memberId, boardId);
		// get board entity by id if board is null throw not found
		var board = repo.findById(boardId).orElseThrow(() -> {
			log.warn("DonationServiceImpl deleteDonationService board not found, board id: {}", boardId);
			return new BusinessExceptionHandler("글이 없습니다", ErrorCode.NOT_FOUND_POST_ERROR);
		});
		// check if member id is same as board member id
		if(!Objects.equals(memberId, board.getMember().getId())) {
			log.warn("DonationServiceImpl deleteDonationService member id not same as board member id, member id: {}, board member id: {}", memberId, board.getMember().getId());
			throw new BusinessExceptionHandler("권한이 없습니다", ErrorCode.FORBIDDEN_ERROR);
		}
		return deleteDonation(board);
	}

	@Override
	@Transactional
	public DonationIdResponseDto deleteDonationAdminService(Integer boardId) {
		log.debug("DonationServiceImpl deleteDonationAdminService boardId: {}", boardId);
		// get board entity by id if board is null throw not found
		var board = repo.findById(boardId).orElseThrow(() -> {
			log.warn("DonationServiceImpl deleteDonationAdminService board not found, board id: {}", boardId);
			return new BusinessExceptionHandler("글이 없습니다", ErrorCode.NOT_FOUND_POST_ERROR);
		});
		return deleteDonation(board);
	}

	@Transactional
	protected DonationIdResponseDto deleteDonation(DonationBoard board) {
		log.debug("DonationServiceImpl deleteDonation board id: {}", board.getId());
		// get header image url and main image url
		var headerKey = getS3Key(board.getHeaderImg());
		var mainKey = getS3Key(board.getMainImg());
		// find item entity( -> on delete cascade)
		// delete entity
		repo.delete(board);
		log.debug("DonationServiceImpl deleteDonation delete entity success, board id: {}", board.getId());
		// delete header image
		s3.delete(headerKey, s3Dir);
		log.debug("DonationServiceImpl deleteDonation delete header image success, headerKey: {}", headerKey);
		// delete main image
		s3.delete(mainKey, s3Dir);
		log.debug("DonationServiceImpl deleteDonation delete main image success, mainKey: {}", mainKey);
		// return entity id
		return DonationIdResponseDto.builder().id(board.getId()).build();
	}

	private String getS3Key(String imageUri) {
		return  imageUri.substring(imageUri.indexOf(s3Dir) + s3Dir.length() + 1);
	}

	@Override
	public GetDonationListResponseDto getDonationListService(GetDonationListServiceRequestDto dto) {
		log.debug("DonationServiceImpl getDonationListService dto: {}", dto);
		return repo.getList(dto);
	}

	@Override
	public GetDonationDetailResponseDto getDonationDetailService(Integer boardId) {
		log.debug("DonationServiceImpl getDonationDetailService boardId: {}", boardId);
		// get board entity by id
		var board = repo.findById(boardId).orElseThrow(() -> {
			log.warn("DonationServiceImpl getDonationDetailService board not found, board id: {}", boardId);
			return new BusinessExceptionHandler("글이 없습니다", ErrorCode.NOT_FOUND_POST_ERROR);
		});

		// get item entity list
		var items = ir.findAllByBoardId(boardId);


		// return dto created from entity
		return GetDonationDetailResponseDto.builder()
			.id(board.getId())
			.memberId(board.getMember().getId())
			.headerImg(board.getHeaderImg())
			.mainImg(board.getMainImg())
			.title(board.getTitle())
			.startDate(board.getStartDate())
			.endDate(board.getEndDate())
			.deliveryAddress(board.getDeliveryAddress())
			.content(board.getContent())
			.state(board.getState())
			.registerDate(board.getRegisterDate())
			.progress(board.getProgress())
			.summary(board.getSummary())
			.items(items)
			.build();
	}
}
