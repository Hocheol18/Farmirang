package com.cg.farmirang.farm.feature.recommend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "pesticide")
public class Pesticide {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pesticide_id")
	private Integer id;

	private String name;
	private String usage;
	private String pestWeed;
	private String cropName;
	private String instruction;
	private String period;
	private String dilution;
	private String safetyCount;
	private String toxity;
	private String safetyPeriod;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "crop_id")
	private Crop crop;
}
