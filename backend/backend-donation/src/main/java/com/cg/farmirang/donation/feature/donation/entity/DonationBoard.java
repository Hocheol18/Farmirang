package com.cg.farmirang.donation.feature.donation.entity;

import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;

import com.cg.farmirang.donation.feature.user.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "donation_board", indexes = {
	@Index(name = "idx_donation_board_member_id", columnList = "member_id")
})
public class DonationBoard {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "donation_board_id")
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Column(name = "header_img", nullable = false)
	private String headerImg;

	@Column(name = "main_img", nullable = false)
	private String mainImg;

	@Column(length = 40, nullable = false)
	private String title;

	@Column(name = "start_date", nullable = false)
	private LocalDateTime startDate;

	@Column(name = "end_date", nullable = false)
	private LocalDateTime endDate;

	@Column(name = "delivery_address", nullable = false)
	private String deliveryAddress;

	@Column(columnDefinition = "TEXT")
	private String content;

	@Column(name = "state", nullable = false)
	@Enumerated(EnumType.STRING)
	private DonationState state = DonationState.DOING;

	@CreatedDate
	@Column(name = "register_date")
	private LocalDateTime registerDate;

	@Column(name = "delete_date")
	private LocalDateTime deleteDate;

	@Column(name = "progress", nullable = false)
	private Double progress = 0.0;

	private String summary;
}
