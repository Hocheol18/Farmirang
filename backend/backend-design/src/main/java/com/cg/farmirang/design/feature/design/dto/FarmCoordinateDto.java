package com.cg.farmirang.design.feature.design.dto;

import com.cg.farmirang.design.feature.design.entity.FarmCoordinate;
import lombok.*;

@Builder @Data @NoArgsConstructor(access = AccessLevel.PROTECTED) @AllArgsConstructor
public class FarmCoordinateDto implements Comparable<FarmCoordinateDto>{
    private Integer row;
    private Integer column;
    private Integer sequence;

    public static FarmCoordinateDto toDto(FarmCoordinate farmCoordinate){
        return FarmCoordinateDto.builder()
                .row(farmCoordinate.getRow())
                .column(farmCoordinate.getCol())
                .sequence(farmCoordinate.getSequence())
                .build();
    }

    @Override
    public int compareTo(FarmCoordinateDto o) {
        return this.sequence-o.sequence;
    }
}
