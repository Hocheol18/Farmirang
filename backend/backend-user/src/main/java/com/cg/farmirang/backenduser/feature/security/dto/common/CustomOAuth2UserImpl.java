package com.cg.farmirang.backenduser.feature.security.dto.common;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.util.Assert;

import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
public class CustomOAuth2UserImpl implements CustomOAuth2User, Serializable {
	private Set<GrantedAuthority> authorities;
	private Map<String, Object> attributes;
	private String nameAttributeKey;
	private String provider;


	public CustomOAuth2UserImpl(Collection<? extends GrantedAuthority> authorities, Map<String, Object> attributes,
		String nameAttributeKey, String provider) {
		Assert.notEmpty(attributes, "attributes cannot be empty");
		Assert.hasText(nameAttributeKey, "nameAttributeKey cannot be empty");
		if (!attributes.containsKey(nameAttributeKey)) {
			throw new IllegalArgumentException("Missing attribute '" + nameAttributeKey + "' in attributes");
		} else {
			this.authorities = authorities != null ?
				Collections.unmodifiableSet(new LinkedHashSet<>(this.sortAuthorities(authorities))) :
				Collections.unmodifiableSet(new LinkedHashSet<>(
					AuthorityUtils.NO_AUTHORITIES));
			this.attributes = Collections.unmodifiableMap(new LinkedHashMap<>(attributes));
			this.nameAttributeKey = nameAttributeKey;
			this.provider = provider;
		}
	}


	public CustomOAuth2UserImpl(OAuth2User user, OAuth2UserRequest userRequest) {
		this(user.getAuthorities(), user.getAttributes(),
			userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName(),
			userRequest.getClientRegistration().getRegistrationId());
	}

	@Override
	public String getSub() {
		return getName();
	}

	@Override
	public String getProvider() {
		return this.provider;
	}

	public String getName() {
		return this.getAttribute(this.nameAttributeKey).toString();
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	public Map<String, Object> getAttributes() {
		return this.attributes;
	}

	private Set<GrantedAuthority> sortAuthorities(Collection<? extends GrantedAuthority> authorities) {
		SortedSet<GrantedAuthority> sortedAuthorities = new TreeSet(
			Comparator.comparing(GrantedAuthority::getAuthority));
		sortedAuthorities.addAll(authorities);
		return sortedAuthorities;
	}
}
