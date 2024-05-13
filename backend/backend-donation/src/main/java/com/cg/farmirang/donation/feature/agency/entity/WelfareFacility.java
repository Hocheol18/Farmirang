package com.cg.farmirang.donation.feature.agency.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "welfare_facility", indexes = {
	@Index(name = "idx_facility_member_id", columnList = "member_id")
})
public class WelfareFacility {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "facility_id")
	private Integer id;

	@Column(name = "member_id", nullable = false)
	private Integer memberId;

	@Column(length = 100, nullable = false)
	private String name;

	@Column(length = 255, nullable = false)
	private String address;

	@Column(length = 100, nullable = false)
	private String contact;
}
