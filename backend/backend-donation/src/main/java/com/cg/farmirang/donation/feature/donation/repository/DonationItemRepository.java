package com.cg.farmirang.donation.feature.donation.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.donation.feature.donation.entity.DonationItem;

@Repository
public interface DonationItemRepository extends JpaRepository<DonationItem, Integer> {
	Optional<DonationItem> findByBoardId(Integer boardId);

}
