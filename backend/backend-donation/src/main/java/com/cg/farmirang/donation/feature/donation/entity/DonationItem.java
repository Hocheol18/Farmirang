package com.cg.farmirang.donation.feature.donation.entity;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.cg.farmirang.donation.feature.farm.entity.Crop;

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
import jakarta.persistence.UniqueConstraint;
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
@Table(name = "donation_item", indexes = {
	@Index(name = "idx_donation_item_donation_board_id", columnList = "donation_board_id")
}, uniqueConstraints = {
	@UniqueConstraint(name = "uk_donation_item_donation_board_id_crop_id", columnNames = {"donation_board_id", "crop_id"})
})
public class DonationItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "donation_item_id")
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "donation_board_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private DonationBoard board;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "crop_id")
	private Crop crop;

	@Column(name = "target_amount", nullable = false)
	private Integer amount;

	@Column(name = "unit", nullable = false)
	private String unit;

	@Column(name = "current_amount", nullable = false)
	private Integer current;

}
