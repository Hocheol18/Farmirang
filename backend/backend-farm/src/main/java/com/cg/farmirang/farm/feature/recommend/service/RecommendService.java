package com.cg.farmirang.farm.feature.recommend.service;

import com.cg.farmirang.farm.feature.recommend.dto.request.RecoFertilizerRequestDto;
import com.cg.farmirang.farm.feature.recommend.dto.request.RecoPesticideRequestDto;
import com.cg.farmirang.farm.feature.recommend.dto.response.RecoFertilizerResponseDto;
import com.cg.farmirang.farm.feature.recommend.dto.response.RecoPesticideResponseDto;

public interface RecommendService {
	RecoPesticideResponseDto recoPesticide(RecoPesticideRequestDto request);
	RecoFertilizerResponseDto recoFertilizer(RecoFertilizerRequestDto request);
}
