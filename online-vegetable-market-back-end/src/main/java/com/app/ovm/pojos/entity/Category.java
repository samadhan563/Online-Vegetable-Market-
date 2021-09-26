package com.app.ovm.pojos.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "category")
public class Category extends BaseEntity {

	@NotNull
	@Length(max = 50, min = 2)
	@Column(length = 50, nullable = false, unique = true)
	private String categoryName;


	@Column(length = 400, nullable = true)
	private String categoryImage;

	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
	List<Product> products = new ArrayList<>();

	public Category() {

	}

	public Category(@NotNull String categoryName, String categoryImage) {
		super();
		this.categoryName = categoryName;
		this.categoryImage = categoryImage;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCategoryImage() {
		return categoryImage;
	}

	public void setCategoryImage(String categoryImage) {
		this.categoryImage = categoryImage;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	@Override
	public String toString() {
		return "Category [categoryName=" + categoryName + "]";
	}
}
