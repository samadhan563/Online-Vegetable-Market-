package com.app.ovm.pojos.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Product extends BaseEntity {

	@NotNull
	@Column(length = 40)
	private String productName;

	@NotNull
	private double pricePerKg;

	@NotNull
	private int availableQuantity;

	@NotNull
	@Column(length = 400, unique = true)
	private String image;

	private double finalPrice;

	@Column(name = "discount_offer")
	private double discountOffer;

	@NotNull
	@Column(length = 100, nullable = false)
	private String description;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "category_id", nullable = false)
	// @JsonIgnoreProperties("products")
	private Category category;

	public Product() {
		// TODO Auto-generated constructor stub
	}

	public Product(@NotNull String productName, @NotNull double pricePerKg, @NotNull int availableQuantity,
			@NotNull String image, double finalPrice, double discountOffer, @NotNull String description,
			Category category) {
		super();
		this.productName = productName;
		this.pricePerKg = pricePerKg;
		this.availableQuantity = availableQuantity;
		this.image = image;
		this.finalPrice = finalPrice;
		this.discountOffer = discountOffer;
		this.description = description;
		this.category = category;
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	
	@Override
	public String toString() {
		return "Product [productName=" + productName + ", pricePerKg=" + pricePerKg + ", availableQuantity="
				+ availableQuantity + ", image=" + image + ", finalPrice=" + finalPrice + ", discountOffer="
				+ discountOffer + ", description=" + description + ", category=" + category + "]";
	}
	
	

}
