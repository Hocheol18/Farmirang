package com.cg.farmirang.farm.feature.recommend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.farmirang.farm.feature.recommend.entity.Pesticide;
import com.cg.farmirang.farm.feature.recommend.repository.custom.PesticideCustomRepository;

public interface PesticideRepository extends JpaRepository<Pesticide, Integer>, PesticideCustomRepository {

}
