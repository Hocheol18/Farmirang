package com.cg.farmirang.farm.feature.recommend.repository.custom;

import static com.cg.farmirang.farm.feature.recommend.entity.QCrop.*;
import static com.cg.farmirang.farm.feature.recommend.entity.QPesticide.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.cg.farmirang.farm.feature.recommend.entity.Crop;
import com.cg.farmirang.farm.feature.recommend.entity.Pesticide;
import com.querydsl.core.types.CollectionExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;


@Repository
@RequiredArgsConstructor
public class PesticideRepositoryImpl implements PesticideCustomRepository{

	private final JPAQueryFactory jpaQueryFactory;
	@Override
	public List<Pesticide> selectPesticideByCrops(List<String> crops) {
		List<Pesticide> results = jpaQueryFactory
			.select(pesticide)
			.from(pesticide)
			.join(pesticide.crop, crop)
			.where(crop.name.in(crops)
				.and(pesticide.pestWeed.like("%병")))
			.fetch();

		return results.stream()
			.collect(Collectors.groupingBy(Pesticide::getPestWeed))
			.values()
			.stream()
			.map(list -> list.get((int) (Math.random() * list.size())))
			.collect(Collectors.toList());
	}
}
