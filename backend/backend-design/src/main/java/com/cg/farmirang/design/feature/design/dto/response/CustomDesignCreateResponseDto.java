package com.cg.farmirang.design.feature.design.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder @Data
public class CustomDesignCreateResponseDto {
    private Long designId;
    private boolean[][] farm;
}
