package com.cg.farmirang.design.feature.design.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder @Getter @Setter
public class RecommendedDesignInfoDto {
    private Integer ridgeWidth;
    private Integer furrowWidth;
    private Boolean isVertical;
    private Integer startMonth;
}
