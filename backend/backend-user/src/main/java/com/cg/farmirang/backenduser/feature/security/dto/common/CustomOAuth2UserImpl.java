package com.cg.farmirang.backenduser.feature.security.dto.common;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.util.Assert;

import com.cg.farmirang.backenduser.feature.user.dto.response.UserInfoForLoginResponseDto;

import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
public class CustomOAuth2UserImpl implements CustomOAuth2User, Serializable {
	private Set<GrantedAuthority> authorities;
	private Map<String, Object> attributes;
	private String nameAttributeKey;
	private String provider;
	private Integer memberId = 0;


	public CustomOAuth2UserImpl(Collection<? extends GrantedAuthority> authorities, Map<String, Object> attributes,
		String nameAttributeKey, String provider, Integer memberId) {
		Assert.notEmpty(attributes, "attributes cannot be empty");
		Assert.hasText(nameAttributeKey, "nameAttributeKey cannot be empty");
		if (!attributes.containsKey(nameAttributeKey)) {
			throw new IllegalArgumentException("Missing attribute '" + nameAttributeKey + "' in attributes");
		} else {
			var attributiesWithProvider = new LinkedHashMap<>(attributes);
			attributiesWithProvider.put("provider", provider);
			this.attributes = Collections.unmodifiableMap(attributiesWithProvider);
			this.authorities = authorities != null ?
				Collections.unmodifiableSet(new LinkedHashSet<>(this.sortAuthorities(authorities))) :
				Collections.unmodifiableSet(new LinkedHashSet<>(
					AuthorityUtils.NO_AUTHORITIES));
			this.nameAttributeKey = nameAttributeKey;
			this.provider = provider;
			this.memberId = memberId;
		}
	}


	public CustomOAuth2UserImpl(OAuth2User user, OAuth2UserRequest userRequest) {
		this(user.getAuthorities(), user.getAttributes(),
			userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName(),
			userRequest.getClientRegistration().getRegistrationId(), 0);
	}

	@Override
	public String getSub() {
		return getName();
	}

	@Override
	public String getProvider() {
		return this.provider;
	}

	@Override
	public Integer getMemberId() {
		return this.memberId;
	}

	@Override
	public void setMemberId(Integer memberId) {
		this.memberId = memberId;
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

	public void setAttributes(UserInfoForLoginResponseDto dto) {
		var newAttributes = new LinkedHashMap<>(this.attributes);
		newAttributes.put("member_id", dto.memberId());
		newAttributes.put("role", dto.role());
		newAttributes.put("nickname", dto.nickname());
		newAttributes.put("profile_img", dto.profileImg());
		this.attributes = Collections.unmodifiableMap(newAttributes);
	}

	private Set<GrantedAuthority> sortAuthorities(Collection<? extends GrantedAuthority> authorities) {
		SortedSet<GrantedAuthority> sortedAuthorities = new TreeSet<>(
			Comparator.comparing(GrantedAuthority::getAuthority));
		sortedAuthorities.addAll(authorities);
		return sortedAuthorities;
	}
}
