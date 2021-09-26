package com.app.ovm.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

public class UserProfileInDto {
	
	
	private int userId;


	private String firstName;

	private String lastName;

	private Long phoneNumber;

	private String email;

	private String idNumber;
	
	private LocalDate dateOfBirth;

	private String profileImage;
	
	public UserProfileInDto() {
		// TODO Auto-generated constructor stub
	}

	public UserProfileInDto(@NotNull int userId, @NotNull String firstName, @NotNull String lastName,
			@NotNull Long phoneNumber, @NotNull String email, @NotNull String idNumber, @NotNull LocalDate dateOfBirth,
			String profileImage) {
		super();
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.idNumber = idNumber;
		this.dateOfBirth = dateOfBirth;
		this.profileImage = profileImage;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	@Override
	public String toString() {
		return "UserProfileInDto [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", phoneNumber=" + phoneNumber + ", email=" + email + ", idNumber=" + idNumber + ", dateOfBirth="
				+ dateOfBirth + ", profileImage=" + profileImage + "]";
	}

}