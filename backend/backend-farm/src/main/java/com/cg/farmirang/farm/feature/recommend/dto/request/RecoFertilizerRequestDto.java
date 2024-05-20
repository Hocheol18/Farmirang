package com.cg.farmirang.farm.feature.recommend.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RecoFertilizerRequestDto {
	List<String> crops;
}
