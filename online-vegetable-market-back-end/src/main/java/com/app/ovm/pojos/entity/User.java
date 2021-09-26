package com.app.ovm.pojos.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import com.app.ovm.pojos.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
//@Table(name = "user")
public class User extends BaseEntity {
	@Column(length = 20, unique = true, nullable = false)
	private String userName;
	@Column(length = 20, nullable = false)
	private String password;
	@Transient
	private String confirmPassword;
	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private UserRole userRole = UserRole.CUSTOMER;
	private LocalDate registrationDate = LocalDate.now();
	private boolean active = true;

	@OneToOne(targetEntity = UserProfile.class, mappedBy = "user")
	private UserProfile userProfile;

	@JsonIgnore
	@OneToMany(targetEntity = Orders.class, mappedBy = "selectedUser")
	private List<Orders> order = new ArrayList<>();

	@OneToMany(mappedBy = "selectedUser", cascade = { CascadeType.PERSIST, CascadeType.REMOVE }, orphanRemoval = true)
	List<OrderDetails> orderDetails = new ArrayList<>();

	public User() {

	}

	public User(String userName, String password, String confirmPassword, UserRole userRole, LocalDate registrationDate,
			boolean active, UserProfile userProfile, List<Orders> order, List<OrderDetails> orderDetails) {
		super();
		this.userName = userName;
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.userRole = userRole;
		this.registrationDate = registrationDate;
		this.active = active;
		this.userProfile = userProfile;
		this.order = order;
		this.orderDetails = orderDetails;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public UserRole getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

	public LocalDate getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(LocalDate registrationDate) {
		this.registrationDate = registrationDate;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}

	public List<Orders> getOrder() {
		return order;
	}

	public void setOrder(List<Orders> order) {
		this.order = order;
	}

	public List<OrderDetails> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetails> orderDetails) {
		this.orderDetails = orderDetails;
	}
	
	

	@Override
	public String toString() {
		return "User [userName=" + userName + ", password=" + password + ", confirmPassword=" + confirmPassword
				+ ", userRole=" + userRole + ", registrationDate=" + registrationDate + ", active=" + active
				+ ", userProfile=" + userProfile + ", order=" + order + ", orderDetails=" + orderDetails + "]";
	}

}
