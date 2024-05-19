package com.cg.farmirang.design.feature.design.repository.querydsl;

import com.cg.farmirang.design.feature.design.dto.CropSelectionOrderedByCropDto;

import java.util.List;

public interface CropSelectionRepositoryCustom {
    List<CropSelectionOrderedByCropDto> findByCropHeightGreaterThanEqual(Long designId, String string);
    List<CropSelectionOrderedByCropDto> findByCropHeightLesserThan(Long designId, String string);
}
