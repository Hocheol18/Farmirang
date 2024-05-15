package com.cg.farmirang.chat.global.common.repository;

import com.cg.farmirang.chat.global.common.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    @Query("select m.nickname from Member m where m.id= :memberId")
    Optional<String> findNicknameByMemberId(Integer memberId);
}
