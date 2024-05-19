package com.cg.farmirang.farm.feature.recommend.dto;

import com.cg.farmirang.farm.feature.recommend.entity.Pesticide;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PesticideDto {
	private Integer id;

	private String name;
	private String usage;
	private String pestWeed;
	private String instruction;
	private String period;
	private String dilution;
	private String safetyCount;
	private String toxity;
	private String safetyPeriod;

	public static PesticideDto toDto(Pesticide pesticide){
		return PesticideDto.builder()
			.id(pesticide.getId())
			.name(pesticide.getName())
			.usage(pesticide.getUsage())
			.pestWeed(pesticide.getPestWeed())
			.instruction(pesticide.getInstruction())
			.period(pesticide.getPeriod())
			.dilution(pesticide.getDilution())
			.safetyCount(pesticide.getSafetyCount())
			.toxity(pesticide.getToxity())
			.safetyPeriod(pesticide.getSafetyPeriod())
			.build();
	}
}
