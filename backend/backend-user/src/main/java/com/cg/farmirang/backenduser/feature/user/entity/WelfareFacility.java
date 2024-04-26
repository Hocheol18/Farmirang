package com.cg.farmirang.backenduser.feature.user.entity;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
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
@Table(name = "welfare_facility", indexes = @Index(name = "idx_facility_member_id", columnList = "member_id"))
public class WelfareFacility {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "facility_id")
	private Integer id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	//TODO: 조회 시 쿼리문 확인해보기(Member  테이블이 같이 조회되면 안됨)
	private Member member;

	@Column(length = 100)
	private String name;

	@Column(length = 255)
	private String address;

	@Column(name = "report_number", length = 255)
	private String reportNumber;

	@Column
	@ColumnDefault("false")
	private Boolean approval;

	@Column(length = 100)
	private String contact;
}
