package com.cg.farmirang.design.feature.design.dto;

import lombok.*;

@Data @Builder @NoArgsConstructor(access = AccessLevel.PROTECTED) @AllArgsConstructor
public class CropNumberAndCropIdDto {
    private Integer cropId;
    private Integer number;
}

