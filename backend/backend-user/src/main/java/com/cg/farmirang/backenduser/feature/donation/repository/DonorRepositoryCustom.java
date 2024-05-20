package com.cg.farmirang.backenduser.feature.donation.repository;

public interface DonorRepositoryCustom {
	Long countDonorByMemberIdAndApproval(Integer memberId, Boolean approval);
}
