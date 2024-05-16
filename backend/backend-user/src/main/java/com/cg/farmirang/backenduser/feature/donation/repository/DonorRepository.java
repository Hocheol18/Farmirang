package com.cg.farmirang.backenduser.feature.donation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.backenduser.feature.donation.entity.Donor;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Integer>, DonorRepositoryCustom {
}
