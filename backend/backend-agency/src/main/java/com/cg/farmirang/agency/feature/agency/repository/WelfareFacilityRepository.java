package com.cg.farmirang.agency.feature.agency.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.agency.feature.agency.entity.WelfareFacility;

@Repository
public interface WelfareFacilityRepository extends JpaRepository<WelfareFacility, Integer>, WelfareFacilityRepositoryCustom {
	Optional<WelfareFacility> findByMemberId(Integer memberId);

}
