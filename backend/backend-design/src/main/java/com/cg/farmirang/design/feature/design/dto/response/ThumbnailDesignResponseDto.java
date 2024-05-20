package com.cg.farmirang.design.feature.design.dto.response;

import com.cg.farmirang.design.feature.design.dto.CropNumberAndCropIdDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data @Builder
public class ThumbnailDesignResponseDto {
    private int[][] designArray;
    private boolean[][] booleanFarmArrangement;
    private List<CropNumberAndCropIdDto> cropNumberAndCropIdDtoList;
}
