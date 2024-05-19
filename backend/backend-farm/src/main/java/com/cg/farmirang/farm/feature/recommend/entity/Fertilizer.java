package com.cg.farmirang.farm.feature.recommend.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "fertilizer")
public class Fertilizer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fertilizer_id")
	private Integer id;

	private String name;
	private Double nitrogen;
	private Double phosphate;
	private Double potassium;
	private Double addNitrogen;
	private Double addPhosphate;
	private Double addPotassium;
}
