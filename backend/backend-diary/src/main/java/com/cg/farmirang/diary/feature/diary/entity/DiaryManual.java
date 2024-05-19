package com.cg.farmirang.diary.feature.diary.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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
@Table(name = "diary_manual")
public class DiaryManual {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "diary_manual_id")
	private Long id;

	@OneToOne
	@JoinColumn(name = "diary_id")
	private Diary diary;

	@Column(name = "content", columnDefinition = "TEXT")
	private String content;

	@Column(name = "photo")
	private String photo;

	@CreatedDate
	@Column(updatable = false)
	private LocalDate createAt;

	@LastModifiedDate
	private LocalDateTime modifiedAt;
}
