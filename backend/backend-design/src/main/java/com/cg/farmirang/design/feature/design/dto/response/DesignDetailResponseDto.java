package com.cg.farmirang.design.feature.design.dto.response;

import com.cg.farmirang.design.feature.design.dto.CropNumberAndCropIdDto;
import com.cg.farmirang.design.feature.design.entity.Arrangement;
import com.cg.farmirang.design.feature.design.entity.Design;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
public class DesignDetailResponseDto {
    private boolean[][] farm;
    private int[][] designArray;
    private List<CropNumberAndCropIdDto> cropNumberAndCropIdDtoList;
    private String name;
    private List<String> cropList;
    private String savedTime;

    public static DesignDetailResponseDto toDto(Arrangement selectedArrangement, String name, LocalDateTime savedTime, List<String> cropList){
        return DesignDetailResponseDto.builder()
                .farm(selectedArrangement.getBooleanFarmArrangement())
                .designArray(selectedArrangement.getDesignArrangement())
                .cropNumberAndCropIdDtoList((selectedArrangement.getCropNumberAndCropIdDtoList()!=null) ? selectedArrangement.getCropNumberAndCropIdDtoList() : new ArrayList<>())
                .name(name)
                .savedTime(savedTime.format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                .cropList(cropList)
                .build();
    }
}
