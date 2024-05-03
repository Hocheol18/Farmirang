package com.cg.farmirang.diary.feature.diary.entity;

import java.time.LocalDate;
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
@Table(name = "diary")
public class Diary {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "diary_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "field_id")
	Field field;

	@OneToMany(mappedBy = "diary_auto", fetch = FetchType.LAZY)
	@JoinColumn(name = "diary_auto_id")
	List<DiaryAuto> diaryAuto;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "diary_manual_id")
	DiaryManual diaryManual;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "diary_total_id")
	DiaryTotal diaryTotal;

	@Column(name = "diary_at")
	LocalDate diaryAt;
}
