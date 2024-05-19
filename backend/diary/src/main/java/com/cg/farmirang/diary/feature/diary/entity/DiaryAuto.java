package com.cg.farmirang.diary.feature.diary.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "diary_auto")
public class DiaryAuto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "diary_auto_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "diary_id")
	private Diary diary;

	@Column(name = "crop_name")
	private String cropName;

	@Column(name = "content")
	private String content;

	@CreatedDate
	@Column(updatable = false)
	private LocalDate createAt;
}
