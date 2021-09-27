package com.app.ovm.pojos.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Cart extends BaseEntity {
	
	private int productId;
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
	@Column(length = 200, nullable = false)
	private String description;

	@JsonIgnoreProperties
	private int userId;

	public Cart() {
		System.out.println("in ctor of " + getClass().getName());
	}

	public Cart(int productId, @NotNull String productName, @NotNull double pricePerKg, @NotNull int availableQuantity,
			@NotNull String image, double finalPrice, double discountOffer, @NotNull String description, int userId) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.pricePerKg = pricePerKg;
		this.availableQuantity = availableQuantity;
		this.image = image;
		this.finalPrice = finalPrice;
		this.discountOffer = discountOffer;
		this.description = description;
		this.userId = userId;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
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

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Cart [productId=" + productId + ", productName=" + productName + ", pricePerKg=" + pricePerKg
				+ ", availableQuantity=" + availableQuantity + ", image=" + image + ", finalPrice=" + finalPrice
				+ ", discountOffer=" + discountOffer + ", description=" + description + ", userId=" + userId + "]";
	}

}