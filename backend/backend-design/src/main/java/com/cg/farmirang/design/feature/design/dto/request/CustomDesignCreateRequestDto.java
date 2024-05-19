package com.cg.farmirang.design.feature.design.dto.request;

import com.cg.farmirang.design.feature.design.dto.CropNumberAndCropIdDto;
import com.cg.farmirang.design.feature.design.dto.CropIdAndQuantityDto;
import lombok.*;

import java.util.List;

@Builder @Data @NoArgsConstructor(access = AccessLevel.PROTECTED) @AllArgsConstructor
public class CustomDesignCreateRequestDto {
    private int[][] designArray;
    private List<CropNumberAndCropIdDto> cropNumberAndCropIdDtoList;
    private List<CropIdAndQuantityDto> cropIdAndQuantityDtoList;
}
