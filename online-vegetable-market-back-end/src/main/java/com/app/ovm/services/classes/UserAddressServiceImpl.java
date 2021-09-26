package com.app.ovm.services.classes;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ovm.dao.IUserAddressRepository;
import com.app.ovm.dao.IUserProfileRepository;
import com.app.ovm.dao.IUserRepository;
import com.app.ovm.pojos.entity.User;
import com.app.ovm.pojos.entity.UserAddress;
import com.app.ovm.pojos.entity.UserProfile;
import com.app.ovm.services.interfaces.IUserAddressService;
@Service
@Transactional
public class UserAddressServiceImpl implements IUserAddressService {

	@Autowired
	private IUserAddressRepository addressRepository;
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IUserProfileRepository profileRepository;

	@Override
	public UserAddress addUserAddress(UserAddress userAddress, int userId) {
		User user = userRepository.findById(userId).get();
		UserProfile userProfile = profileRepository.getUserProfile(user).get();
		userAddress.setUserProfile(userProfile);
		return addressRepository.save(userAddress);
	}

	@Override
	public UserAddress getUserAddress(int userId) {
		User user = userRepository.findById(userId).get();
		UserProfile userProfile = profileRepository.getUserProfile(user).get();
		return addressRepository.findByUserProfile(userProfile).get();
	}
}
