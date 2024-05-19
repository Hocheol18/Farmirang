package com.cg.farmirang.farm.feature.recommend.dto;

import com.cg.farmirang.farm.feature.recommend.entity.Fertilizer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FertilizerDto {
	private Integer id;
	private Double nitrogen;
	private Double phosphate;
	private Double potassium;
	private Double addNitrogen;
	private Double addPhosphate;
	private Double addPotassium;

	public static FertilizerDto toDto(Fertilizer fertilizer){
		return FertilizerDto.builder()
			.id(fertilizer.getId())
			.nitrogen(fertilizer.getNitrogen())
			.phosphate(fertilizer.getPhosphate())
			.potassium(fertilizer.getPotassium())
			.addNitrogen(fertilizer.getAddNitrogen())
			.addPhosphate(fertilizer.getAddPhosphate())
			.addPotassium(fertilizer.getAddPotassium())
			.build();
	}
}
