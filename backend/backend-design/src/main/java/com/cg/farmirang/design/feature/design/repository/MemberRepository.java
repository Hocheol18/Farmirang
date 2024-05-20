package com.cg.farmirang.design.feature.design.repository;

import com.cg.farmirang.design.feature.design.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
}
