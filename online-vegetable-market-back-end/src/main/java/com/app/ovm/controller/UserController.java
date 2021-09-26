package com.app.ovm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ovm.dto.UserProfileInDto;
import com.app.ovm.pojos.entity.User;
import com.app.ovm.pojos.entity.UserAddress;
import com.app.ovm.pojos.entity.UserProfile;
import com.app.ovm.services.interfaces.IUserAddressService;
import com.app.ovm.services.interfaces.IUserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

	@Autowired
	private IUserService userService;

	@Autowired
	private IUserAddressService addressService;

	@GetMapping("/fetch-all-users")
	public ResponseEntity<?> fetchAllUsers() {
		try {
			return new ResponseEntity<>(userService.fetchAllUsers(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/register-new-user")
	public ResponseEntity<?> registerNewUser(@RequestBody User user) {
		try {
			System.out.println(user);
			return new ResponseEntity<>(userService.registerNewUser(user), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/update-old-user/{userId}")
	public ResponseEntity<?> updateOldUser(@RequestBody User user, @PathVariable int userId) {
		try {
			System.out.println(user);
			return new ResponseEntity<>(userService.updateOldUser(user, userId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
//	-----------------------------------------------------------------------------------------------------------------------------------------------

	@GetMapping("/get-user-profile/{userId}")
	public ResponseEntity<?> getUserProfile(@PathVariable int userId) {
		try {
			System.out.println("I'm invoked...");
			UserProfile profileDetails = userService.getUserProfile(userId);

			return new ResponseEntity<>(profileDetails, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/update-profile/{userId}")
	public ResponseEntity<?> updateUserProfile(@RequestBody UserProfile newUser, @PathVariable int userId) {
		try {
			System.out.println(newUser);
			UserProfile profileDetails = userService.updateUserProfile(newUser, userId);
			return new ResponseEntity<>(profileDetails, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/add-user-profile")
	public ResponseEntity<?> addUserProfile(@RequestBody UserProfileInDto newUser) {
		try {
			System.out.println(newUser);
			UserProfile profileDetails = userService.addUserProfile(newUser);
			return new ResponseEntity<>(profileDetails, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	// --------------------------------------------------------------------------------------------------

	@PutMapping("/update-user-address/{userId}")
	public ResponseEntity<?> addUserAddress(@PathVariable int userId, @RequestBody UserAddress userAddress) {
		try {
			System.out.println(userAddress);
			UserAddress uA = addressService.addUserAddress(userAddress,userId);
			return new ResponseEntity<>(uA, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-user-address/{userId}")
	public ResponseEntity<?> getUserAddress(@PathVariable int userId) {
		try {
			System.out.println("I'm invoked...");
			UserAddress uA = addressService.getUserAddress(userId);

			return new ResponseEntity<>(uA, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
