package com.app.ovm.services.interfaces;

import java.util.List;

import com.app.ovm.dto.LoginRequest;
import com.app.ovm.dto.UserProfileInDto;
import com.app.ovm.pojos.entity.User;
import com.app.ovm.pojos.entity.UserProfile;

public interface IUserService {

	List<User> fetchAllUsers();

	User registerNewUser(User user);

	User autenticateUser(LoginRequest loginRequest);

	User updateOldUser(User user, int userId);

	UserProfile getUserProfile(int userId);

	UserProfile addUserProfile(UserProfileInDto newUser);

	UserProfile updateUserProfile(UserProfile newUser, int userId);

}
