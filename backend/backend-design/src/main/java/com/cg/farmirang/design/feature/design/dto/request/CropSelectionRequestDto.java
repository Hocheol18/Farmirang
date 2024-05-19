package com.cg.farmirang.design.feature.design.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Builder
public class CropSelectionRequestDto {
    private Integer cropId;
    private Integer priority;
    private Integer quantity;
}
