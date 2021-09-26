package com.app.ovm.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.ovm.pojos.entity.UserAddress;
import com.app.ovm.pojos.entity.UserProfile;

public interface IUserAddressRepository extends JpaRepository<UserAddress, Integer> {

	Optional<UserAddress> findByUserProfile(UserProfile userProfile);

}
	