package com.cg.farmirang.design.feature.design.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class EmptyFarmCreateResponseDto {
    private int[][] designArray;
    private Long designId;
    private boolean[][] farm;
}
