package com.cg.farmirang.donation.feature.donation.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import com.cg.farmirang.donation.feature.farm.entity.Crop;
import com.cg.farmirang.donation.feature.user.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@DynamicUpdate
@Table(name = "donor", indexes = {
	@Index(name = "idx_donor_donation_board_id", columnList = "donation_board_id"),
	@Index(name = "idx_donor_member_id", columnList = "member_id"),
})
public class Donor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "donor_id")
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "donation_board_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private DonationBoard board;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "crop_id")
	private Crop crop;

	@Column(name = "donation_amount", nullable = false)
	private Integer amount;

	@Column(nullable = true)
	private Boolean approval;

	@CreatedDate
	@Column(name = "register_date", updatable = false)
	private LocalDateTime registerDate;

	@Column(name = "delete_date", nullable = true)
	private LocalDateTime deleteDate;

	@Column(name = "confirm_img", nullable = false)
	private String confirmImg;


	public Integer updateApproval(Boolean approval) {
		this.approval = approval;
		return this.id;
	}

}
