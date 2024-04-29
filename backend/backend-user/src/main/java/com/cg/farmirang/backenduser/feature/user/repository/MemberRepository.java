package com.cg.farmirang.backenduser.feature.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.backenduser.feature.user.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
}
