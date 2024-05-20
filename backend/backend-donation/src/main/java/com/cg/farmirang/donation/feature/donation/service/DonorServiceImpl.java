package com.cg.farmirang.donation.feature.donation.service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.donation.feature.donation.dto.request.ApproveDonorRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.request.GetDonorListServiceRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.request.RegisterDonorRequestDto;
import com.cg.farmirang.donation.feature.donation.dto.response.ApproveDonorResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.DonorIdResponseDto;
import com.cg.farmirang.donation.feature.donation.dto.response.GetDonorListResponseDto;
import com.cg.farmirang.donation.feature.donation.entity.DonationState;
import com.cg.farmirang.donation.feature.donation.entity.Donor;
import com.cg.farmirang.donation.feature.donation.repository.DonationBoardRepository;
import com.cg.farmirang.donation.feature.donation.repository.DonationItemRepository;
import com.cg.farmirang.donation.feature.donation.repository.DonorRepository;
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
public class DonorServiceImpl implements DonorService {
	private final DonorRepository repo;
	private final DonationBoardRepository br;
	private final DonationItemRepository ir;
	private final MemberRepository mr;
	private final CropRepository cr;
	private final S3Service s3;

	@Value("${cloud.aws.s3.dir}")
	private String s3Dir;

	@Override
	@Transactional
	public DonorIdResponseDto registerDonorService(Integer memberId, RegisterDonorRequestDto data, MultipartFile img) {
		log.debug("DonorServiceImpl registerDonorService: memberId={}", memberId);
		// upload image and get url
		var uuid = UUID.randomUUID().toString();
		var url = s3.upload(img, s3Dir, uuid);
		// find board entity by id
		var board = br.findById(data.boardId()).orElseThrow(() -> {
			log.warn("DonorServiceImpl registerDonorService: board not found");
			return new BusinessExceptionHandler("기부글을 찾을 수 없습니다", ErrorCode.NOT_FOUND_POST_ERROR);
		});
		log.debug("DonorServiceImpl registerDonorService: board id: {}", board.getId());
		// find member entity by id
		var member = mr.findById(memberId).orElseThrow(() -> {
			log.warn("DonorServiceImpl registerDonorService: member not found");
			return new BusinessExceptionHandler("사용자를 찾을 수 없습니다", ErrorCode.NOT_FOUND_MEMBER_ERROR);
		});
		// find crop entity by id
		var crop = cr.findById(data.cropId()).orElseThrow(() -> {
			log.warn("DonorServiceImpl registerDonorService: crop not found");
			return new BusinessExceptionHandler("작물을 찾을 수 없습니다", ErrorCode.NOT_FOUND_CROP_ERROR);
		});
		log.debug("DonorServiceImpl registerDonorService: crop id: {}", crop.getId());
		// create entity
		var entity = Donor.builder()
			.board(board)
			.member(member)
			.crop(crop)
			.amount(data.amount())
			.confirmImg(url)
			.registerDate(LocalDateTime.now())
			.build();
		// save entity
		repo.save(entity);
		// return entity id
		return DonorIdResponseDto.builder().id(entity.getId()).build();
	}

	@Override
	@Transactional
	public DonorIdResponseDto deleteDonorService(Integer memberId, Integer donorId) {
		log.debug("DonorServiceImpl deleteDonorService: memberId={}", memberId);
		// find entity if null throw exception
		var entity = repo.findById(donorId).orElseThrow(() -> {
			log.warn("DonorServiceImpl deleteDonorService: donor not found");
			return new BusinessExceptionHandler("기부글을 찾을 수 없습니다", ErrorCode.NOT_FOUND_POST_ERROR);
		});
		// if member id is not equal to entity member id, throw exception
		if (!Objects.equals(memberId, entity.getMember().getId())){
			log.warn("DonorServiceImpl deleteDonorService: member id not equal");
			throw new BusinessExceptionHandler("사용자가 일치하지 않습니다", ErrorCode.FORBIDDEN_ERROR);
		}
		return deleteDonor(entity);
	}

	@Override
	@Transactional
	public DonorIdResponseDto deleteDonorAdminService(Integer donorId) {
		log.debug("DonorServiceImpl deleteDonorAdminService: donorId={}", donorId);
		// find entity if null throw exception
		var entity = repo.findById(donorId).orElseThrow(() -> {
			log.warn("DonorServiceImpl deleteDonorAdminService: donor not found");
			return new BusinessExceptionHandler("기부글을 찾을 수 없습니다", ErrorCode.NOT_FOUND_POST_ERROR);
		});
		return deleteDonor(entity);
	}

	@Transactional
	protected DonorIdResponseDto deleteDonor(Donor entity) {
		// if approval is true, can't delete
		if (entity.getApproval() != null && entity.getApproval()){
			log.warn("DonorServiceImpl deleteDonorService: donor is approved");
			throw new BusinessExceptionHandler("승인된 기부글은 삭제할 수 없습니다", ErrorCode.FORBIDDEN_ERROR);
		}
		// get image url
		var url = entity.getConfirmImg();
		// delete entity
		repo.delete(entity);
		log.debug("DonorServiceImpl deleteDonorService: donor delete complete, donor id: {}", entity.getId());
		// delete image
		s3.delete(getS3Key(url), s3Dir);
		log.debug("DonorServiceImpl deleteDonorService: image delete complete, url: {}", url);
		// return entity id
		return DonorIdResponseDto.builder().id(entity.getId()).build();
	}

	private String getS3Key(String imageUri) {
		return  imageUri.substring(imageUri.indexOf(s3Dir) + s3Dir.length() + 1);
	}

	@Override
	public GetDonorListResponseDto getDonorListService(GetDonorListServiceRequestDto data) {
		log.debug("DonorServiceImpl getDonorListService: board id: {}", data.donationId());
		return repo.getList(data);
	}

	@Override
	@Transactional
	public ApproveDonorResponseDto approveDonorService(Integer memberId, ApproveDonorRequestDto data) {
		log.debug("DonorServiceImpl approveDonorService: memberId: {}", memberId);
		var donor = repo.getDonorByBoardMemberId(data.id(), memberId).orElseThrow(() -> {
			log.warn("DonorServiceImpl approveDonorService: donor not found");
			return new BusinessExceptionHandler("기부글을 찾을 수 없습니다", ErrorCode.NOT_FOUND_POST_ERROR);
		});
		if(data.approval() == donor.getApproval()) return ApproveDonorResponseDto.builder().id(data.id()).build();
		Double avg = null;
		if(data.approval())  avg = ir.approveCurrentAndGetAverage(donor.getBoard().getId(), donor.getCrop().getId(), donor.getAmount());
		else if (donor.getApproval() != null) avg = ir.rejectCurrentAndGetAverage(donor.getBoard().getId(), donor.getCrop().getId(), donor.getAmount());

		if(avg != null) {
			br.updateProgress(donor.getBoard().getId(), avg);
			if(ir.checkDonationComplete(donor.getBoard().getId())) {
				br.updateState(donor.getBoard().getId(), DonationState.DONE);
			}
		}

		donor.updateApproval(data.approval());

		return ApproveDonorResponseDto.builder().id(data.id()).build();
	}
}
