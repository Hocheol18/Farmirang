package com.cg.farmirang.farm.feature.recommend.repository.custom;

import java.util.List;

import com.cg.farmirang.farm.feature.recommend.entity.Crop;
import com.cg.farmirang.farm.feature.recommend.entity.Pesticide;

public interface PesticideCustomRepository {
	List<Pesticide> selectPesticideByCrops(List<String> crops);
}
