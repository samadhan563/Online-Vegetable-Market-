package com.app.ovm.services.classes;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ovm.dao.IUserProfileRepository;
import com.app.ovm.dao.IUserRepository;
import com.app.ovm.dto.LoginRequest;
import com.app.ovm.dto.UserProfileInDto;
import com.app.ovm.pojos.entity.User;
import com.app.ovm.pojos.entity.UserProfile;
import com.app.ovm.services.interfaces.IUserService;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IUserProfileRepository userProfileRepository;

	
	@Override
	public User autenticateUser(LoginRequest loginRequest) {
		return userRepository.autenticateUser(loginRequest.getUserName(), loginRequest.getPassword()).get();
	}

	@Override
	public List<User> fetchAllUsers() {

		return userRepository.findAll();
	}

	@Override
	public User registerNewUser(User user) {

		return userRepository.save(user);
	}

	@Override
	public User updateOldUser(User user,int userId) {
		
		User oldUser = userRepository.findById(userId).get();
		return oldUser;
	}
	
	
	@Override
	public UserProfile getUserProfile(int userId) {
		System.out.println(userId);
		System.out.println(userRepository.findById(userId).get());
		User user=userRepository.findById(userId).get();
		System.out.println(user);
		return userProfileRepository.findByUser(user).get();
//		 return userProfileRepository.getUserProfile(user).get();
		
	}
	
	@Override
	public UserProfile addUserProfile(UserProfileInDto newUser) {
		System.out.println(newUser.getUserId());
		User user = userRepository.findById(newUser.getUserId()).get();

		System.out.println(user);
		UserProfile validatedUser = new UserProfile();
		validatedUser.setFirstName(newUser.getFirstName());
		validatedUser.setLastName(newUser.getLastName());
		validatedUser.setDateOfBirth(newUser.getDateOfBirth());
		validatedUser.setEmail(newUser.getEmail());
		validatedUser.setPhoneNumber(newUser.getPhoneNumber());
		validatedUser.setIdNumber(newUser.getIdNumber());
		validatedUser.setUser(user);
		validatedUser.setProfileImage(newUser.getProfileImage());
		System.out.println(validatedUser + "   " + newUser.getProfileImage().length());
		UserProfile profile = userProfileRepository.save(validatedUser);
		user.setUserProfile(validatedUser);
		userRepository.save(user);
		return profile;
	}

	@Override
	public UserProfile updateUserProfile(UserProfile newUser,int userId) {
		User user = userRepository.findById(userId).get();

		System.out.println(user);
		UserProfile validatedUser =  userProfileRepository.findByUser(user).get();
		validatedUser.setFirstName(newUser.getFirstName());
		validatedUser.setLastName(newUser.getLastName());
		validatedUser.setDateOfBirth(newUser.getDateOfBirth());
		validatedUser.setEmail(newUser.getEmail());
		validatedUser.setPhoneNumber(newUser.getPhoneNumber());
		validatedUser.setIdNumber(newUser.getIdNumber());
		validatedUser.setUser(user);
		validatedUser.setProfileImage(newUser.getProfileImage());
		System.out.println(validatedUser + "   " + newUser.getProfileImage().length());
		UserProfile profile = userProfileRepository.save(validatedUser);
		user.setUserProfile(validatedUser);
		userRepository.save(user);
		return profile;
	}

}
