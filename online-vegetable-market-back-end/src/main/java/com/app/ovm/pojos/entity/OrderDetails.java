package com.app.ovm.pojos.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "order_details")
public class OrderDetails extends BaseEntity {

	@NotNull
	@Column(length = 40)
	private String productName;

	@NotNull
	private double pricePerKg;

	@NotNull
	private int availableQuantity;

	@NotNull
	@Column(length = 200)
	private String image;

	private double finalPrice;

	@Column(name = "discount_offer")
	private double discountOffer;

	@NotNull
	@Column(length = 100, nullable = false)
	private String description;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", nullable = true)
	private User selectedUser;

	@OnDelete(action = OnDeleteAction.NO_ACTION)
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "order_id", nullable = false)
	private Orders selectedOrder;

	public OrderDetails() {

	}

	public OrderDetails(@NotNull String productName, @NotNull double pricePerKg, @NotNull int availableQuantity,
			@NotNull String image, double finalPrice, double discountOffer, @NotNull String description,
			User selectedUser, Orders selectedOrder) {
		super();
		this.productName = productName;
		this.pricePerKg = pricePerKg;
		this.availableQuantity = availableQuantity;
		this.image = image;
		this.finalPrice = finalPrice;
		this.discountOffer = discountOffer;
		this.description = description;
		this.selectedUser = selectedUser;
		this.selectedOrder = selectedOrder;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public double getPricePerKg() {
		return pricePerKg;
	}

	public void setPricePerKg(double pricePerKg) {
		this.pricePerKg = pricePerKg;
	}

	public int getAvailableQuantity() {
		return availableQuantity;
	}

	public void setAvailableQuantity(int availableQuantity) {
		this.availableQuantity = availableQuantity;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public double getFinalPrice() {
		return finalPrice;
	}

	public void setFinalPrice(double finalPrice) {
		this.finalPrice = finalPrice;
	}

	public double getDiscountOffer() {
		return discountOffer;
	}

	public void setDiscountOffer(double discountOffer) {
		this.discountOffer = discountOffer;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getSelectedUser() {
		return selectedUser;
	}

	public void setSelectedUser(User selectedUser) {
		this.selectedUser = selectedUser;
	}

	public Orders getSelectedOrder() {
		return selectedOrder;
	}

	public void setSelectedOrder(Orders selectedOrder) {
		this.selectedOrder = selectedOrder;
	}

	@Override
	public String toString() {
		return "OrderDetails [productName=" + productName + ", pricePerKg=" + pricePerKg + ", availableQuantity="
				+ availableQuantity + ", image=" + image + ", finalPrice=" + finalPrice + ", discountOffer="
				+ discountOffer + ", description=" + description + ", selectedUser=" + selectedUser + ", selectedOrder="
				+ selectedOrder + "]";
	}

}