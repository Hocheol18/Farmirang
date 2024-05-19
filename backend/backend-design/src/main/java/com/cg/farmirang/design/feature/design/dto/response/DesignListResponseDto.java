package com.cg.farmirang.design.feature.design.dto.response;

import com.cg.farmirang.design.feature.design.dto.DesignForListDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder @Data
public class DesignListResponseDto {
    private List<DesignForListDto> designList;
}
