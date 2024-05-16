package com.cg.farmirang.donation.feature.donation.repository;

public interface DonationItemRepositoryCustom {
	Double approveCurrentAndGetAverage(Integer boardId, Integer cropId, Integer amount);
	Double rejectCurrentAndGetAverage(Integer boardId, Integer cropId, Integer amount);
	Double getAverage(Integer boardId);
	Boolean checkDonationComplete(Integer boardId);
}
