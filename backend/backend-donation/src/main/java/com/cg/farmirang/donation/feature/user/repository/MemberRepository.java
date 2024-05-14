package com.cg.farmirang.donation.feature.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.farmirang.donation.feature.user.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Integer>{
}
