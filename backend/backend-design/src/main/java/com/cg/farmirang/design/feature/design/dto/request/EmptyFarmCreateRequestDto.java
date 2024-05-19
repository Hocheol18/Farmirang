package com.cg.farmirang.design.feature.design.dto.request;

import com.cg.farmirang.design.feature.design.dto.FarmCoordinateDto;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
@Builder @Data @NoArgsConstructor(access = AccessLevel.PROTECTED) @AllArgsConstructor
public class EmptyFarmCreateRequestDto {
    private List<FarmCoordinateDto> coordinates;
    @NotNull
    private Integer area;
    @NotNull
    private Integer startMonth;
    @NotNull
    private Integer ridgeWidth;
    @NotNull
    private Integer furrowWidth;
    @NotNull
    private Boolean isVertical;

}
