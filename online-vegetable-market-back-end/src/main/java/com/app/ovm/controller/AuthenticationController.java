package com.app.ovm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ovm.dto.LoginRequest;
import com.app.ovm.services.interfaces.IUserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthenticationController {
	
	@Autowired
	private IUserService userService;

	
	@PostMapping("/login")
	public ResponseEntity<?> autenticateUser(@RequestBody LoginRequest loginRequest) {
		try {
			return new ResponseEntity<>(userService.autenticateUser(loginRequest), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
