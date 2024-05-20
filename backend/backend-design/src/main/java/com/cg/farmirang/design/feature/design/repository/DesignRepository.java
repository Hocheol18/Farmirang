package com.cg.farmirang.design.feature.design.repository;

import com.cg.farmirang.design.feature.design.entity.Design;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DesignRepository  extends JpaRepository<Design, Long> {
    Optional<Design> findByMemberIdAndIsThumbnailTrue(Integer memberId);

    Optional<Design> findByMemberIdAndId(Integer memberId, Long designId);

    Optional<List<Design>> findAllByMemberIdOrderByIsThumbnailDescCreateAtDesc(Integer memberId);
}
