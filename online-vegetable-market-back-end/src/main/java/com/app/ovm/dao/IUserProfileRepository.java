package com.app.ovm.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.ovm.pojos.entity.User;
import com.app.ovm.pojos.entity.UserProfile;

public interface IUserProfileRepository extends JpaRepository<UserProfile, Integer> {
	
	@Query(value = "select u from UserProfile u where u.user=:user")
	Optional<UserProfile> getUserProfile(User user);

	Optional<UserProfile> findByUser(User user);

}
