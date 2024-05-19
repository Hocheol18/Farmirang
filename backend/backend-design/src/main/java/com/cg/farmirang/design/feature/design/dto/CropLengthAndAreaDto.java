package com.cg.farmirang.design.feature.design.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder @Getter @Setter
public class CropLengthAndAreaDto {
    private Integer cropHeight;
    private Integer cropWidth;
    private Integer area;
}
