package com.cg.farmirang.agency.feature.agency.entity;

import com.cg.farmirang.agency.feature.user.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@Column(length = 100, nullable = false)
	private String name;

	@Column(length = 255, nullable = false)
	private String address;

	@Column(name = "report_number", length = 255, unique = true, nullable = false)
	private String reportNumber;

	@Column
	private Boolean approval;

	@Column(length = 100, nullable = false)
	private String contact;

	@Column(length = 200)
	private String reason;

	@Column(nullable = true)
	private String img;
}
