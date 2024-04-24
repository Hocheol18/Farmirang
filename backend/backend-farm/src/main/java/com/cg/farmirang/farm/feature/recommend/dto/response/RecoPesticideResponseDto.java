package com.cg.farmirang.farm.feature.recommend.dto.response;

import java.util.List;
import java.util.Map;

import com.cg.farmirang.farm.feature.recommend.dto.PesticideDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecoPesticideResponseDto {
	Map<String, List<PesticideDto>> pesticides;
}
