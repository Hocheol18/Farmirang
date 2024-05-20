package com.cg.farmirang.donation.feature.donation.entity;

public enum DonationState {
	DOING("DOING"),
	DONE("DONE");

	private final String state;

	DonationState(String state) {
		this.state = state;
	}
}
