package com.cg.farmirang.donation.feature.donation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.donation.feature.donation.entity.DonationItem;

@Repository
public interface DonationItemRepository extends JpaRepository<DonationItem, Integer>, DonationItemRepositoryCustom {
	Optional<DonationItem> findByBoardIdAndCropId(Integer boardId, Integer cropId);
	List<DonationItemInfoDto> findAllByBoardId(Integer boardId);

}
