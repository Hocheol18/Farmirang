package com.cg.farmirang.farm.feature.recommend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cg.farmirang.farm.feature.recommend.dto.FertilizerDto;
import com.cg.farmirang.farm.feature.recommend.dto.PesticideDto;
import com.cg.farmirang.farm.feature.recommend.dto.request.RecoFertilizerRequestDto;
import com.cg.farmirang.farm.feature.recommend.dto.request.RecoPesticideRequestDto;
import com.cg.farmirang.farm.feature.recommend.dto.response.RecoFertilizerResponseDto;
import com.cg.farmirang.farm.feature.recommend.dto.response.RecoPesticideResponseDto;
import com.cg.farmirang.farm.feature.recommend.entity.Crop;
import com.cg.farmirang.farm.feature.recommend.entity.Pesticide;
import com.cg.farmirang.farm.feature.recommend.repository.CropRepository;
import com.cg.farmirang.farm.feature.recommend.repository.PesticideRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class RecommendServiceImpl implements RecommendService{

	private final PesticideRepository pesticideRepository;
	private final CropRepository cropRepository;

	@Override
	public RecoPesticideResponseDto recoPesticide(RecoPesticideRequestDto request) {
		List<Pesticide> pesticides = pesticideRepository.selectPesticideByCrops(request.getCrops());
		Map<String, List<PesticideDto>> result = new HashMap<>();
		for (Pesticide pesticide : pesticides) {
			if(!result.containsKey(pesticide.getCropName())){
				result.put(pesticide.getCropName(), new ArrayList<>());
			}
			result.get(pesticide.getCropName()).add(PesticideDto.toDto(pesticide));
		}
		return RecoPesticideResponseDto.builder().pesticides(result).build();
	}

	@Override
	public RecoFertilizerResponseDto recoFertilizer(RecoFertilizerRequestDto request) {
		List<Crop> crops = cropRepository.findByNameIn(request.getCrops());
		Map<String, List<FertilizerDto>> result = new HashMap<>();
		for (Crop crop : crops) {
			if(!result.containsKey(crop.getName())){
				result.put(crop.getName(), new ArrayList<>());
			}
			result.get(crop.getName()).add(FertilizerDto.toDto(crop.getFertilizer()));
		}
		return RecoFertilizerResponseDto.builder().fertilizers(result).build();
	}
}
