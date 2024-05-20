package com.cg.farmirang.farm.feature.recommend.dto.response;

import java.util.List;
import java.util.Map;

import com.cg.farmirang.farm.feature.recommend.dto.FertilizerDto;
import com.cg.farmirang.farm.feature.recommend.dto.PesticideDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecoFertilizerResponseDto {
	Map<String, List<FertilizerDto>> fertilizers;
}
