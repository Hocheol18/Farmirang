package com.cg.farmirang.design.feature.design.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @Builder
public class CropSelectionOrderedByCropDto {
    private Integer cropId;
    private Integer ridgeSpacing;
    private Integer cropSpacing;
    private String sowingTime;
    private String harvestingTime;
    private Boolean isRepeated;
    private Integer height;
    private Integer priority;
    private Integer quantity;

//    @QueryProjection
    public CropSelectionOrderedByCropDto(Integer cropId, Integer ridgeSpacing, Integer cropSpacing, String sowingTime, String harvestingTime, Boolean isRepeated, Integer height, Integer priority, Integer quantity) {
        this.cropId = cropId;
        this.ridgeSpacing = ridgeSpacing;
        this.cropSpacing = cropSpacing;
        this.sowingTime = sowingTime;
        this.harvestingTime = harvestingTime;
        this.isRepeated = isRepeated;
        this.height = height;
        this.priority = priority;
        this.quantity = quantity;
    }

}
