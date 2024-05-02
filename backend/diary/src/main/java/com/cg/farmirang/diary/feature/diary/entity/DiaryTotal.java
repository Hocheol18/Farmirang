package com.cg.farmirang.diary.feature.diary.entity;

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
@Table(name = "diary_total")
public class DiaryTotal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "diary_total_id")
	private Long id;

	@OneToOne
	@JoinColumn(name = "field_id")
	private Field field;

	@Column(name = "weather")
	private String weather;

	@Column(name = "weather_icon")
	private String weatherIcon;

	@Column(name = "temperature")
	private String temperature;

	@Column(name = "humidity")
	private String humidity;

	@Column(name = "field_humidity")
	private String fieldHumidity;

	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime createAt;
}
