package com.cg.farmirang.design.feature.design.entity;

import com.cg.farmirang.design.feature.design.dto.CropNumberAndCropIdDto;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@ToString
@Document(collection = "design_arrangement")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Arrangement {
    @Id
    private String id;
    private char[][] arrangement;
    private int[][] designArrangement;
    private boolean[][] booleanFarmArrangement;
    private List<CropNumberAndCropIdDto> cropNumberAndCropIdDtoList;

}
