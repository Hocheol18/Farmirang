package com.cg.farmirang.backenduser.feature.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "social_login", indexes = {
	@Index(name = "idx_social_member_id", columnList = "member_id"),
	@Index(name = "idx_social_provider_sub", columnList = "provider, sub")
})
public class SocialLogin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "social_login_id")
	private Integer id;

	@JoinColumn(name = "member_id")
	@ManyToOne
	private Member member;

	@Column(length = 10)
	private String provider;

	@Column(length = 100)
	private String sub;
}
