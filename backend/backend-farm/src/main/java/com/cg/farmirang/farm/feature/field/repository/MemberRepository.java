package com.cg.farmirang.farm.feature.field.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.farmirang.farm.feature.field.entity.Field;
import com.cg.farmirang.farm.feature.field.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
	@EntityGraph(attributePaths = {"fields"})
	Optional<Member> findById(Integer id);
}
