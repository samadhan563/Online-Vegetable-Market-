package com.app.ovm.pojos.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.app.ovm.pojos.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Orders extends BaseEntity {

	@Enumerated(EnumType.STRING)
	private OrderStatus orderDeliveryStatus;

	private double totalPrice;

	private LocalDate orderDate;

	private LocalDate deliveryDate;

	// @OnDelete(action = OnDeleteAction.NO_ACTION)
	@JsonIgnore
	@OneToMany( mappedBy = "selectedOrder")
	List<OrderDetails> orderDetails = new ArrayList<>();

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	// @OnDelete(action = OnDeleteAction.NO_ACTION)
	@JoinColumn(name = "user_id", nullable = true)
	private User selectedUser;

	@JsonIgnore
	@OneToOne(targetEntity = Payment.class, mappedBy = "orders")
	private Payment payment;
	
	
	public Orders() {
		
	}
	public Orders(OrderStatus orderDeliveryStatus, double totalPrice, LocalDate orderDate, LocalDate deliveryDate,
			List<OrderDetails> orderDetails, User selectedUser, Payment payment) {
		super();
		this.orderDeliveryStatus = orderDeliveryStatus;
		this.totalPrice = totalPrice;
		this.orderDate = orderDate;
		this.deliveryDate = deliveryDate;
		this.orderDetails = orderDetails;
		this.selectedUser = selectedUser;
		this.payment = payment;
	}
	public OrderStatus getOrderDeliveryStatus() {
		return orderDeliveryStatus;
	}
	public void setOrderDeliveryStatus(OrderStatus orderDeliveryStatus) {
		this.orderDeliveryStatus = orderDeliveryStatus;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	public LocalDate getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}
	public LocalDate getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(LocalDate deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public List<OrderDetails> getOrderDetails() {
		return orderDetails;
	}
	public void setOrderDetails(List<OrderDetails> orderDetails) {
		this.orderDetails = orderDetails;
	}
	public User getSelectedUser() {
		return selectedUser;
	}
	public void setSelectedUser(User selectedUser) {
		this.selectedUser = selectedUser;
	}
	public Payment getPayment() {
		return payment;
	}
	public void setPayment(Payment payment) {
		this.payment = payment;
	}
	

}
