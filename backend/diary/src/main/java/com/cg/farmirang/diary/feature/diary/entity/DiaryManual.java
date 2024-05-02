package com.cg.farmirang.diary.feature.diary.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "diary_manual")
public class DiaryManual {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "diary_manual_id")
	private Long id;

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
