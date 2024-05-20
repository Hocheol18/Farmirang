package com.cg.farmirang.design.feature.design.dto.response;

import com.cg.farmirang.design.feature.design.dto.CropDataDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder @Data
public class FarmForCustomGetResponseDto {
    private List<CropDataDto> cropList;
}
