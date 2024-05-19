package com.cg.farmirang.farm.feature.field.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.Comment;

import com.cg.farmirang.farm.feature.field.dto.request.FieldCreateRequestDto;
import com.cg.farmirang.farm.feature.field.dto.request.FieldModifyRequestDto;
import com.cg.farmirang.farm.global.common.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
@Table(name = "field")
public class Field extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "field_id")
	@Comment("텃밭 ID")
	private Long id;

	@Column(name = "title", length = 30)
	@Comment("제목")
	private String title;

	@Column(name = "content")
	@Comment("설명")
	private String content;

	@Column(name = "address")
	@Comment("주소")
	private String address;

	@Column(name = "start_at")
	@Comment("시작 시기")
	private LocalDateTime startAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "design_id")
	private Design design;

	@OneToOne
	@JoinColumn(name = "iot_id")
	private IoT iot;

	public static Field toEntity(FieldCreateRequestDto dto){
		return Field.builder()
			.title(dto.getTitle())
			.content(dto.getContent())
			.address(dto.getAddress())
			.startAt(dto.getStartAt())
			.member(Member.builder().id(dto.getUser()).build())
			.design(Design.builder().id(dto.getDesign()).build())
			.iot(IoT.builder().id(dto.getIot()).build())
			.build();
	}

	public void update(FieldModifyRequestDto dto){
		this.title = dto.getTitle();
		this.content = dto.getContent();
		this.address = dto.getAddress();
		this.startAt = dto.getStartAt();
		this.member = Member.builder().id(dto.getUser()).build();
		this.design = Design.builder().id(dto.getDesign()).build();
		this.iot = IoT.builder().id(dto.getIot()).build();
	}
}
