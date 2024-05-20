package com.cg.farmirang.farm.feature.field.entity;

import org.hibernate.annotations.Comment;
import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "Design")
public class Design {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "design_id")
	@Comment("텃밭 ID")
	private Long id;

	@Column(name = "name")
	@Comment("제목")
	private String name;
}
