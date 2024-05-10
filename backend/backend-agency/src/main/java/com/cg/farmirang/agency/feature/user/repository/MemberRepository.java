package com.cg.farmirang.agency.feature.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.agency.feature.user.entity.Member;
import com.cg.farmirang.agency.feature.user.entity.MemberRole;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer>, MemberRepositoryCustom {
	Optional<Member> findByIdAndRoleNot(Integer id, MemberRole role);
}
