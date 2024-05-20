package com.cg.farmirang.design.feature.design.dto.response;

import com.cg.farmirang.design.feature.design.dto.CropNumberAndCropIdDto;
import com.cg.farmirang.design.feature.design.dto.FarmCoordinateDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder @Getter @Setter
public class RecommendedDesignCreateResponseDto {
    private int[][] designArray;
    private List<CropNumberAndCropIdDto> cropNumberAndCropIdDtoList;
    private List<FarmCoordinateDto> farmCoordinateList;
}
