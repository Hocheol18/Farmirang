package com.cg.farmirang.design.feature.design.dto.request;

import com.cg.farmirang.design.feature.design.dto.CropIdAndQuantityAndPriorityDto;
import lombok.*;

import java.util.List;

@Data @Builder @NoArgsConstructor(access = AccessLevel.PROTECTED) @AllArgsConstructor
public class RecommendedDesignCreateRequestDto {
    private List<CropIdAndQuantityAndPriorityDto> cropList;
}
