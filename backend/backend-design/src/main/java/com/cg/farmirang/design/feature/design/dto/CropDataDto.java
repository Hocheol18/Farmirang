package com.cg.farmirang.design.feature.design.dto;

import lombok.*;

@Builder @Data
public class CropDataDto {
    private Integer cropId;
    private String name;
    private Boolean isRecommended;
    private CropLengthAndAreaDto cropLengthAndAreaDto;
}
